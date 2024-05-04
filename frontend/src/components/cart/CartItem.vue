<script setup>
import { ref, defineProps, watch, computed } from "vue";
import { $items } from "./cart";
import { useStore } from "@nanostores/vue";

const props = defineProps({
  id: String,
  quantity: Number,
  itemName: String,
  price: Number,
  imageUrl: String,
  available: Boolean,
});

function findItemIndexById(originalArr, id) {
  for (let i = 0; i < originalArr.length; i++) {
    if (originalArr[i].id == id) {
      return i;
    }
  }
  return -1;
}

const items = useStore($items);
const removeItem = ref(false);
const addItem = ref(false);
const deleteItem = ref(false);

const itemIndex = computed(() => findItemIndexById(items.value, props.id));

const realQuantity = computed(() =>
  itemIndex.value !== -1 ? items.value[itemIndex.value].quantity : props.quantity
);
const realPrice = computed(() =>
  itemIndex.value !== -1 ? items.value[itemIndex.value].price : props.price
);

watch(addItem, (val) => {
  if (val) {
    const tmpItems = [...items.value];
    const itemIndex = findItemIndexById(tmpItems, props.id);
    if (itemIndex !== -1) {
      const updatedItem = {
        ...tmpItems[itemIndex],
        quantity: tmpItems[itemIndex].quantity + 1,
      };
      tmpItems.splice(itemIndex, 1, updatedItem);
      $items.set(tmpItems);
    }
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
        $items.set(tmpItems);
      }
    }
    removeItem.value = false;
  }
});

watch(deleteItem, (val) => {
  if (val) {
    const tmpItems = items.value.filter((item) => item.id !== props.id);
    $items.set(tmpItems);
    deleteItem.value = false;
  }
});
</script>

<template>
  <v-card :title="itemName">
    <img :src="imageUrl" />
    <p>
      Quantity: {{ realQuantity }} Price: {{ realPrice }}€
      <small v-if="available">Available</small>
    </p>
    <v-card-actions>
      <v-btn @click="addItem = true">Add</v-btn>
      <v-btn @click="removeItem = true">Remove</v-btn>
      <v-btn @click="deleteItem = true">Delete</v-btn>
    </v-card-actions>
  </v-card>
</template>
