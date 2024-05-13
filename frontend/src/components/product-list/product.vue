<script type="module">
export default {
  name: "Item",
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
};
</script>

<template>
  <div>
    <label>
      {{ item.article }}: {{ item.quantity }} штук ёпта ......
      {{ item.quantity * item.price }}₽
    </label>
  </div>
</template>
