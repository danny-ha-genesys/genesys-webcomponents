/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import '@stencil/core';




export namespace Components {

<<<<<<< HEAD
  interface GenesysButton {
    /**
    * The component accent (secondary or primary).
    */
    'accent': string;
    /**
    * Indicate if the button is disabled or not
    */
    'disabled': boolean;
    /**
    * The component left icon.
    */
    'leftIcon': string;
    /**
    * The component right icon.
    */
    'rightIcon': string;
    /**
    * The component text.
    */
    'text': string;
  }
  interface GenesysButtonAttributes extends StencilHTMLAttributes {
    /**
    * The component accent (secondary or primary).
    */
    'accent'?: string;
    /**
    * Indicate if the button is disabled or not
    */
    'disabled'?: boolean;
    /**
    * The component left icon.
    */
    'leftIcon'?: string;
    /**
    * The component right icon.
    */
    'rightIcon'?: string;
    /**
    * The component text.
    */
    'text'?: string;
=======
  interface GenesysTest {
    /**
    * Indicate the firt
    */
    'first': string;
    /**
    * Indicate the last
    */
    'last': string;
    /**
    * Indicate the firt
    */
    'middle': string;
  }
  interface GenesysTestAttributes extends StencilHTMLAttributes {
    /**
    * Indicate the firt
    */
    'first'?: string;
    /**
    * Indicate the last
    */
    'last'?: string;
    /**
    * Indicate the firt
    */
    'middle'?: string;
    /**
    * Triggered 2s after the component is loaded.
    */
    'onCustom'?: (event: CustomEvent) => void;
>>>>>>> put back components as needed to be generated.
  }
}

declare global {
  interface StencilElementInterfaces {
<<<<<<< HEAD
    'GenesysButton': Components.GenesysButton;
  }

  interface StencilIntrinsicElements {
    'genesys-button': Components.GenesysButtonAttributes;
  }


  interface HTMLGenesysButtonElement extends Components.GenesysButton, HTMLStencilElement {}
  var HTMLGenesysButtonElement: {
    prototype: HTMLGenesysButtonElement;
    new (): HTMLGenesysButtonElement;
  };

  interface HTMLElementTagNameMap {
    'genesys-button': HTMLGenesysButtonElement
  }

  interface ElementTagNameMap {
    'genesys-button': HTMLGenesysButtonElement;
=======
    'GenesysTest': Components.GenesysTest;
  }

  interface StencilIntrinsicElements {
    'genesys-test': Components.GenesysTestAttributes;
  }


  interface HTMLGenesysTestElement extends Components.GenesysTest, HTMLStencilElement {}
  var HTMLGenesysTestElement: {
    prototype: HTMLGenesysTestElement;
    new (): HTMLGenesysTestElement;
  };

  interface HTMLElementTagNameMap {
    'genesys-test': HTMLGenesysTestElement
  }

  interface ElementTagNameMap {
    'genesys-test': HTMLGenesysTestElement;
>>>>>>> put back components as needed to be generated.
  }


  export namespace JSX {
    export interface Element {}
    export interface IntrinsicElements extends StencilIntrinsicElements {
      [tagName: string]: any;
    }
  }
  export interface HTMLAttributes extends StencilHTMLAttributes {}

}
