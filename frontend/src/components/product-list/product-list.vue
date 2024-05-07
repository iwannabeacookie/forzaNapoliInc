<script type='module'>
import Item from './product.vue'

export default {
    name: 'ItemList',
    components: {
        Item
    },
    props: {
        items: {
            type: Array,
            required: true
        }
    }
}
</script>

<template>
    <div>
        <ul>
            <li v-for="list in items" :key="list.id">
                <div v-for="article in list" :key='article.id'>
                    <Item :data='article' />
                </div>	
            </li>
        </ul>
    </div>
</template>
