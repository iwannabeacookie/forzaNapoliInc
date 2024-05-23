<template>
    <div class="modifyPage">
        <div class="nameSurnameForm">
            <form @submit.prevent="modifyName" class="formSN">
                <p>CHANGE NAME</p>
                <input type="text" v-model="name" required placeholder="Enter new name" class="input"/>
                <input type="submit" value="UPDATE" />
            </form>
            <form @submit.prevent="modifySurname" class="formSN">
                <p>CHANGE SURNAME</p>
                <input type="text" v-model="surname" required placeholder="Enter new surname" class="input"/>
                <input type="submit" value="UPDATE" />
            </form>
        </div>
        <form @submit.prevent="modifyPassword" class="formP">
            <p>CHANGE PASSWORD</p>
            <input type="password" v-model="repassword" required placeholder="Enter new password" class="input"/>
            <input type="password" v-model="password" required placeholder="Re-enter new password" class="input"/>
            <input type="submit" value="UPDATE" />
        </form>
    </div>
</template>

<style>
.modifyPage {
    border: 1px solid #ddd;
    padding: 20px;
    margin: 10px;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
}

.nameSurnameForm{
    display: flex;
    padding: 20px;
    align-content: space-evenly;
}

form{
    padding: 15px;
    text-align: center
}

form > p{
    margin-bottom: 15px;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
}

input[type=submit]{
    background-color: #74edff;
}

.input{
    background-color: #bff6ff;
}

.formSN{
    width: 50%;
}

</style>

<script>
import axios from "axios";
const sessionid = useCookie("sessionId");
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default {
    data() {
        return {
            name: "",
            surname: "",
            password: "",
            repassword: "",
        };
    },
    methods: {
        async modifyName() {
            await axios
                .post("http://localhost:3000/profile/modify/name", {
                    name: this.name,
                    sessionid: sessionid,
                })
                .then((response) => {
                    console.log(response);
                    this.name = "";
                    toast.info("Name Changed", {
                        autoClose: 1500,
                        position: "top-center",
                        closeButton: false,
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        async modifySurname() {
            await axios
                .post("http://localhost:3000/profile/modify/surname", {
                    surname: this.surname,
                    sessionid: sessionid,
                })
                .then((response) => {
                    console.log(response);
                    this.surname = "";
                    toast.info("Surname Changed", {
                        autoClose: 1500,
                        position: "top-center",
                        closeButton: false,
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        async modifyPassword() {
            if (this.password === this.repassword) {
                await axios
                    .post("http://localhost:3000/profile/modify/password", {
                        password: this.password,
                        sessionid: sessionid,
                    })
                    .then((response) => {
                        console.log(response);
                        this.password = "";
                        toast.info("Password Changed", {
                            autoClose: 1500,
                            position: "top-center",
                            closeButton: false,
                        });
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            } else {
                toast.error("Passwords don't match", {
                    autoClose: 1500,
                    position: "top-center",
                    closeButton: false,
                });
            }
        },
    },
};
</script>
