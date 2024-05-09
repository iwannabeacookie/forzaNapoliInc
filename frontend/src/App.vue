<script type='module'>
import ItemList from './components/product-list/product-list.vue'
import { postTicket } from './components/product-list/scripts/post.js'

export default {
    name: 'App',
    components: {
        ItemList
    },
    data() {
        return {
            phone: '',
            email: '',
            message: '',
        }
    },
    methods: {
        submitTicket() {
            let ticketBody = {
                phone: this.phone,
                email: this.email,
                message: this.message,
            }
            postTicket(ticketBody)
            this.phone = ''
            this.email = ''
            this.message = ''
        }
    },
    // async created() {
    // }
}
</script>

<template>
    <div id="app" class="container">
        <h2>Submit a Support Ticket</h2>
        <form @submit.prevent="submitTicket">
            <label for="phone">Phone Number:</label>
            <input type="text" id="phone" v-model="phone" required><br>

            <label for="email">Email:</label>
            <input type="text" id="email" v-model="email" required><br>

            <label for="message">Describe Your Issue:</label><br>
            <textarea id="message" v-model="message" rows="6" required></textarea><br>

            <input type="submit" value="Submit Ticket">
        </form>
    </div>
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
