<script type='module'>


export default {
    name: 'Item',
    props: {
        label: {
            type: String,
            required: true
        }
    }
}
</script>

<template>
    <div>
        <label> {{ label }} </label>
    </div>
</template>
