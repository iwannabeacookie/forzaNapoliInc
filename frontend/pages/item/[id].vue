<template>
    <AppItem :id="id" />
</template>

<script>
import AppItem from "../src/components/inspect-item/Item.vue";

export default {
    components: {
        AppItem,
    },
    computed: {
        id() {
            return this.$route.params.id;
        },
    },
};
</script>
