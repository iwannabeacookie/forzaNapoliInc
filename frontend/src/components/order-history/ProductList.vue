<script type="module">
import Item from "./product.vue";

export default {
  name: "ItemList",
  components: {
    Item,
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
};
</script>

<template>
  <div>
    <ul>
      <li v-for="order in data.orders" :key="order.id">
        <label>
          Order id: {{ order._id }}, date: {{ order.date }}, status:
          {{ order.status }}
        </label>
        <div v-for="item in order.items" :key="item.id">
          <Item :item="item" />
        </div>
      </li>
    </ul>
  </div>
</template>
