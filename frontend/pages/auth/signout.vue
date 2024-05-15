<template>
    <div class="form-wrap">
        <h1>SIGN OUT</h1>
        <p>Are you sure you want sign out?</p>
        <form @submit.prevent="userSignout">
            <button type="submit">Sign Out</button>
        </form>
    </div>
</template>

<script>

import '~/assets/css/access_form.css'

export default {
    data() {
        return {
            username: '',
            password: '',
            message: ''
        }
    },
    methods: {
        async userSignout() {
            const sessionid = useCookie('sessionId');
            await useFetch('http://localhost:3000/signout', {
                method: 'post',
                body: {
                    sessionid: sessionid
                }
            }).then((response) => {
                if (response.error.value) {
                    console.log(response.error);
                } else {
                    sessionid.value = '';
                    navigateTo('/');
                }
            });
        }
    }
}
</script>