<template>
  <div class="container">
      <div lang="en">
    <div class="table-placeholder"></div>
    <gux-pagination :total-items="totalItems" items-per-page="25"></gux-pagination>
  </div>

    <gux-form-field>
      <input
        slot="input"
        name="number"
        type="number"
        placeholder="Enter number"
        step="50"
        min="0"
        v-model.number="totalItems"
      />
      <label slot="label">Number</label>
    </gux-form-field>

    <gux-button v-on:click="doubleTotalItems">Double Total Items</gux-button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data: function () {
    return {
      totalItems: 100
    }
  },
  methods: {
    doubleTotalItems: function () {
      this.totalItems = this.totalItems * 2;
    }
  }
}
</script>

<style scoped>
  .container {
    border: 1px solid black;
    padding: 20px;
  }

  .table-placeholder {
    padding: 10px;
    color: #f1f1f1;
    text-align: center;
    background-image: linear-gradient(
      45deg,
      #f1f1f1 25%,
      transparent 25%,
      transparent 50%,
      #f1f1f1 50%,
      #f1f1f1 75%,
      transparent 75%,
      #fff
    );
    background-size: 5px 5px;
  }

  .table-placeholder::before {
    padding: 5px;
    content: 'Table Placeholder';
    background-color: white;
  }
</style>
