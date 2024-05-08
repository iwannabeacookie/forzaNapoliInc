<script type='module'>
import ItemList from './components/product-list/product-list.vue'
import { getHistory } from './components/product-list/scripts/getHistory.js'

export default {
    name: 'App',
    components: {
        ItemList
    },
    data() {
        return {
            items: []
        }
    },
    async created() {
        getHistory({ _id: "6636140f667afaeb2c1d6338" })
            .then((orders) => {
                this.items = orders
            })
            .catch((error) => {
                console.log('Blyat! Error fetching history:', error)
            })
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
    <ItemList :items='items' />
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
