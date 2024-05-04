<script setup>
import { ref } from "vue";
import CartItem from "./CartItem.vue";
import {useStore} from "@nanostores/vue"
import {$items} from "./cart"

const itemsParent = useStore($items)
const items = ref(itemsParent)

const dialog = ref(true);
</script>


<style>
.cartContent {
  display: flex;
  flex-direction: row;
  gap: 10px;
  padding: 0 10px 0 10px;
  width: 1000%;
  overflow: show;
}
</style>

<template>
  <div class="text-center pa-4">
    <v-dialog v-model="dialog" width="auto">
      <v-card max-width="100%" prepend-icon="mdi-update" title="Cart">
        <div class="cartContent">
          <cart-item
            v-for="item in items"
            :key="item.itemName"
            :id="item.id"
            :quantity="item.quantity"
            :itemName="item.itemName"
            :price="item.price"
            :imageUrl="item.imageUrl"
            :available="item.available"
          />
        </div>
        <template v-slot:actions>
          <v-btn class="ms-auto" text="Close" @click="dialog = false"></v-btn>
        </template>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialog: false,
    };
  },
};
</script>