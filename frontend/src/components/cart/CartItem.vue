<script setup>
import { ref, watch, computed } from "vue";
import { $items, findItemIndexById, updateCart } from "./scripts/cart";
import { useStore } from "@nanostores/vue";

const props = defineProps({
  id: String,
  quantity: Number,
  itemName: String,
  price: Number,
  imageUrl: String,
  available: Boolean,
});

const items = useStore($items);
const removeItem = ref(false);
const addItem = ref(false);
const deleteItem = ref(false);

const itemIndex = computed(() => findItemIndexById(items.value, props.id));

const realQuantity = computed(() =>
  itemIndex.value !== -1
    ? items.value[itemIndex.value].quantity
    : props.quantity,
);
const realPrice = computed(() =>
  itemIndex.value !== -1 ? items.value[itemIndex.value].price : props.price,
);

watch(addItem, (val) => {
  if (val) {
    const tmpItems = [...items.value];
    const itemIndex = findItemIndexById(tmpItems, props.id);
    console.warn("INDEX:", itemIndex);
    if (itemIndex !== -1) {
      const updatedItem = {
        ...tmpItems[itemIndex],
        quantity: tmpItems[itemIndex].quantity + 1,
      };
      tmpItems.splice(itemIndex, 1, updatedItem);
    }
    updateCart(tmpItems);
    addItem.value = false;
  }
});

watch(removeItem, (val) => {
  if (val) {
    console.info("ID:", props.id);
    const tmpItems = [...items.value];
    const itemIndex = findItemIndexById(tmpItems, props.id);
    if (itemIndex !== -1) {
      const updatedItem = {
        ...tmpItems[itemIndex],
        quantity: tmpItems[itemIndex].quantity - 1,
      };
      tmpItems.splice(itemIndex, 1, updatedItem);
      if (updatedItem.quantity <= 0) {
        deleteItem.value = true;
      } else {
        updateCart(tmpItems);
      }
    }
    removeItem.value = false;
  }
});

watch(deleteItem, (val) => {
  if (val) {
    const tmpItems = items.value.filter((item) => item._id !== props.id);
    updateCart(tmpItems);
    deleteItem.value = false;
  }
});
</script>

<template>
  <v-card :title="itemName">
    <img :src="imageUrl" class="productImg" />
    <p>
      Quantity: {{ quantity }} Price:
      {{ parseFloat(price * quantity).toFixed(2) }}€
      <small v-if="available">Available</small>
    </p>
    <v-card-actions>
      <v-btn @click="addItem = true" text="+1" style="width: 40px" />
      <v-btn @click="removeItem = true" text="-1" style="width: 40px" />
      <v-btn @click="deleteItem = true" text="Delete" style="width: 40px" />
    </v-card-actions>
  </v-card>
</template>

<style scoped>
.productImg {
  max-width: 200px;
  max-height: 500px;
}
</style>
