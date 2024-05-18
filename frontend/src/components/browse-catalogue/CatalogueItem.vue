<template>
    <div class="catalogue-item">
        <img :src="item.imageUrl" alt="Item picture" class="item-image" />
        <h2 class="item-title">{{ item.article }}</h2>
        <p class="item-description">{{ item.description_short }}</p>
        <p class="item-price" v-if="item.sale">
            <s>Price: {{ item.price }}</s> New Price: {{ Math.ceil(discountedPrice) - 0.01 }}
        </p>
        <p class="item-price" v-else>Price: {{ item.price }}</p>
        <p class="item-sale" v-if="item.sale">Sale: {{ item.sale }}%</p>
        <p class="item-availability">
            Availability: {{ item.available ? "Available" : "Out of stock" }}
        </p>
        <NuxtLink :to="`item/${item._id}`"><button>Inspect</button></NuxtLink>
    </div>
</template>

<script>
export default {
    name: "CatalogueItem",
    props: {
        item: {
            type: Object,
            required: true,
        },
    },
    computed: {
        discountedPrice() {
            return (this.item.price * (100 - this.item.sale)) / 100;
        },
    },
};
</script>

<style scoped>
.catalogue-item {
    border: 1px solid #ddd;
    padding: 20px;
    margin: 10px;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
}

.item-image {
    width: 5%;
    height: auto;
}

.item-title {
    font-size: 20px;
    font-weight: bold;
    margin: 10px 0;
}

.item-description {
    font-size: 16px;
    color: #666;
}

.item-price {
    font-size: 18px;
    color: #333;
    margin: 10px 0;
}

.item-sale {
    color: red;
    font-weight: bold;
}

.item-availability {
    font-size: 16px;
    color: #333;
}
</style>
