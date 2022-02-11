import { CalendarModes } from '../../../../common-enums';
import * as utils from '../../../../utils/dom/manipulate-elements-classes';
import { GuxCalendar } from '../gux-calendar';

describe('gux-calendar', () => {
  let component: GuxCalendar;
  let componentRoot: any;
  beforeEach(async () => {
    component = new GuxCalendar();
    component.input = {
      emit: jest.fn()
    };
    componentRoot = component.root as any;
    componentRoot.querySelector = () => {
      return null;
    };
    componentRoot.querySelectorAll = () => {
      return [];
    };
  });
  it('builds', () => {
    component.componentWillLoad();
    component.render();
    expect(component).toBeTruthy();
  });
  // Methods
  describe('methods', () => {
    const testDate = new Date(2020, 0, 15);
    const testDateIso = '2020-01-15';
    const rangeStart = new Date(1970, 0, 15);
    const rangeEnd = new Date(1970, 0, 20);
    const rangeIso = '1970-01-15/1970-01-20';
    const spyEl = {
      classList: {
        add: jest.fn(),
        contains: () => false
      },
      focus: jest.fn(),
      setAttribute: jest.fn()
    };
    // Public
    describe('public', () => {
      it('setValue with single mode', async () => {
        await component.setValue(testDate);
        expect(component.previewValue).toEqual(testDate);
        expect(component.value).toEqual(testDateIso);
      });
      it('setValue with range mode from-to', async () => {
        component.mode = CalendarModes.Range;
        await component.setValue([rangeStart, rangeEnd]);
        expect(component.previewValue).toEqual(rangeStart);
        expect(component.value).toEqual(rangeIso);
      });
      it('setValue with range mode to-from', async () => {
        component.mode = CalendarModes.Range;
        await component.setValue([rangeEnd, rangeStart]);
        expect(component.previewValue).toEqual(rangeStart);
        expect(component.value).toEqual(rangeIso);
      });
      it('setValue with week mode', async () => {
        component.mode = CalendarModes.Week;
        component.selectingDate = testDate;
        await component.setValue([rangeStart, rangeEnd]);
        expect(component.previewValue).toEqual(testDate);
        expect(component.value).toEqual(rangeIso);
      });
      it('setValue with month mode', async () => {
        component.mode = CalendarModes.Month;
        await component.setValue(testDate);
        expect(component.previewValue).toEqual(testDate);
        expect(component.value).toEqual(testDateIso);
      });
      it('focusPreviewDate', async () => {
        await component.focusPreviewDate();
        expect(spyEl.focus).not.toHaveBeenCalled();
        componentRoot.querySelector = () => {
          return spyEl;
        };
        await component.focusPreviewDate();
        expect(spyEl.focus).toHaveBeenCalled();
      });
    });
    // Private
    describe('private', () => {
      it('incrementPreviewDateByMonth', () => {
        jest.useFakeTimers();
        const startingMonth = component.previewValue.getMonth();
        component.incrementPreviewDateByMonth(3);
        jest.runAllTimers();
        expect(component.previewValue.getMonth()).toEqual(
          (startingMonth + 3) % 12
        );
      });
      it('generateDatesFrom', () => {
        component.value = rangeIso;
        component.mode = CalendarModes.Range;
        const result = component.generateDatesFrom(1, rangeEnd, 42);
        expect(result[0].selected).toEqual(true);
        expect(result).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              hidden: true
            })
          ])
        );
      });
      it('addDays', () => {
        const inc = 2;
        const result = component.addDays(rangeEnd, inc);
        expect(result.getDate()).toEqual(rangeEnd.getDate() + inc);
      });
      it('getAllDatesElements', () => {
        const dummy = ['one', 'two'];
        componentRoot.querySelectorAll = () => {
          return dummy;
        };
        const result = component.getAllDatesElements();
        expect(result).toEqual(dummy);
      });
      it('getRangeDatesElements', () => {
        spyOn(component, 'getRangeDates').and.callThrough();
        component.getRangeDatesElements(rangeStart, rangeEnd);
        expect(component.getRangeDates).toHaveBeenCalledWith(
          rangeStart,
          rangeEnd
        );
        componentRoot.querySelector = () => {
          return 'dummy';
        };
        const result = component.getRangeDatesElements(rangeEnd, rangeStart);
        expect(component.getRangeDates).toHaveBeenCalledWith(
          rangeStart,
          rangeEnd
        );
        expect(result.length).toEqual(6);
      });
      it('onDateClick with single mode', async () => {
        spyOn(component, 'setValue').and.callFake(() => {
          return;
        });
        spyOn(component, 'emitInput').and.callFake(() => {
          return;
        });
        await component.onDateClick(testDate);
        expect(component.setValue).toHaveBeenCalledWith(testDate);
        expect(component.emitInput).toHaveBeenCalled();
      });
      it('onDateClick with range mode', async () => {
        component.mode = CalendarModes.Range;
        spyOn(component, 'getAllDatesElements').and.callFake(() => {
          return;
        });
        spyOn(utils, 'removeClassToElements').and.callFake(() => {
          return;
        });
        spyOn(component, 'emitInput').and.callFake(() => {
          return;
        });
        spyOn(component, 'updateRangeElements').and.callFake(() => {
          return;
        });
        await component.onDateClick(rangeStart);
        await component.onDateClick(rangeEnd);
        expect(component.emitInput).toHaveBeenCalled();
      });
      it('onDateMouseEnter', () => {
        spyOn(component, 'updateRangeElements').and.callFake(() => {
          return;
        });
        component.mode = CalendarModes.Range;
        component.selectingDate = rangeStart;
        component.onDateMouseEnter(rangeEnd);
        expect(component.value.split('/')[1]).toEqual(rangeIso.split('/')[1]);
        expect(component.updateRangeElements).toHaveBeenCalled();
      });
      it('onKeyDown', async () => {
        jest.useFakeTimers();
        spyOn(component, 'incrementPreviewDateByMonth').and.callFake(() => {
          return;
        });
        spyOn(component, 'setValue').and.callFake(() => {
          return;
        });
        spyOn(component, 'emitInput').and.callFake(() => {
          return;
        });
        const initialPreviewValue = rangeEnd;
        component.previewValue = new Date(rangeEnd);
        const days = initialPreviewValue.getDate();
        let event = new KeyboardEvent('keyup', { key: 'ArrowDown' });
        await component.onKeyUp(event);
        jest.runAllTimers();
        expect(component.previewValue.getDate()).toEqual(days + 7);
        event = new KeyboardEvent('keyup', { key: 'ArrowUp' });
        await component.onKeyUp(event);
        jest.runAllTimers();
        expect(component.previewValue.getDate()).toEqual(days);
        event = new KeyboardEvent('keyup', { key: 'ArrowLeft' });
        await component.onKeyUp(event);
        jest.runAllTimers();
        expect(component.previewValue.getDate()).toEqual(days - 1);
        event = new KeyboardEvent('keyup', { key: 'ArrowRight' });
        await component.onKeyUp(event);
        jest.runAllTimers();
        expect(component.previewValue.getDate()).toEqual(days);
        event = new KeyboardEvent('keyup', { key: 'PageUp' });
        await component.onKeyUp(event);
        jest.runAllTimers();
        expect(component.incrementPreviewDateByMonth).toHaveBeenCalledWith(1);
        event = new KeyboardEvent('kkeyup', { key: 'PageDown' });
        await component.onKeyUp(event);
        jest.runAllTimers();
        expect(component.incrementPreviewDateByMonth).toHaveBeenCalledWith(-1);
        event = new KeyboardEvent('keyup', { key: 'Enter' });
        await component.onKeyUp(event);
        jest.runAllTimers();
        expect(component.setValue).toHaveBeenCalledWith(initialPreviewValue);
        expect(component.emitInput).toHaveBeenCalled();
      });

      it('getWeekdays', () => {
        expect(component.getWeekdays().length).toEqual(7);
      });
    });
  });

  // Events
  describe('events', () => {
    it('onInput', () => {
      const value = '2020-01-15';
      component.value = value;
      component.emitInput();
      expect(component.input.emit).toHaveBeenCalledWith(value);
    });
  });
});
