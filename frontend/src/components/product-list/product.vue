<script type='module'>
export default {
    name: 'Item',
    props: {
        data: {
            type: Object,
            required: true
        }
    }
}
</script>

<template>
    <div>
        <label> {{ data.article }}: {{ data.quantity }} штук ёпта ...... {{ data.quantity * data.price }}₽ </label>
    </div>
</template>
