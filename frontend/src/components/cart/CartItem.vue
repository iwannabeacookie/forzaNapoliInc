<script setup>
import { ref, watch, computed } from "vue";
import { $items, findItemIndexById } from "./cart";
import { useStore } from "@nanostores/vue";
import { apiHelperPOST } from "./api";

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
    }
    updateCart(tmpItems)
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
        updateCart(tmpItems)
      }
    }
    removeItem.value = false;
  }
});

watch(deleteItem, (val) => {
  if (val) {
    const tmpItems = items.value.filter((item) => item.id !== props.id);
    updateCart(tmpItems)
    deleteItem.value = false;
  }
});

async function updateCart(new_cart) {
                const {updated_cart, ...respose} = await apiHelperPOST("/cart/update", {"new_cart": new_cart, "user_id": "663751edeb50fc9f32cfd751"})
                console.info("New Cart:", updated_cart.cart)
                $items.set(updated_cart.cart)
        }
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
