<script type='module'>
import ItemList from './components/product-list.vue'

export default {
    name: 'App',
    components: {
        ItemList
    },
    data() {
        return {
            items: [
                { label: 'Item 1' },
                { label: 'Item 2' },
                { label: 'Item 3' }
            ]
        }
    }
}
</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <ItemList :items='items'/>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
