<template>
    <div class="form-wrap">
        <h1>LOG OUT</h1>
        <p>Are you sure you want log out?</p>
        <form @submit.prevent="userLogout">
            <button type="submit">Logout</button>
        </form>
    </div>
</template>

<script>

import '~/assets/css/access_form.css'

export default {
    methods: {
        async userLogout() {
            const sessionid = useCookie('sessionId');
            await useFetch('http://localhost:3000/logout', {
                method: 'post',
                body: {
                    sessionid: sessionid
                }
            }).then((response) => {
                if (response.error.value) {
                } else {
                    sessionid.value = '';
                    navigateTo('/');
                }
            });
        }
    }
}
</script>