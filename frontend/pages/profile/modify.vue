<template>
  <div class="modifyPage">
    <div class="nameSurnameForm">
      <form @submit.prevent="modifyName" class="formSN">
        <p>CHANGE NAME</p>
        <input
          type="text"
          v-model="name"
          required
          placeholder="Enter new name"
          class="input"
        />
        <input type="submit" value="UPDATE" />
      </form>
      <form @submit.prevent="modifySurname" class="formSN">
        <p>CHANGE SURNAME</p>
        <input
          type="text"
          v-model="surname"
          required
          placeholder="Enter new surname"
          class="input"
        />
        <input type="submit" value="UPDATE" />
      </form>
    </div>
    <form @submit.prevent="modifyPassword" class="formP">
      <p>CHANGE PASSWORD</p>
      <input
        type="password"
        v-model="repeatPassword"
        required
        placeholder="Enter new password"
        class="input"
      />
      <input
        type="password"
        v-model="password"
        required
        placeholder="Re-enter new password"
        class="input"
      />
      <input type="submit" value="UPDATE" />
    </form>
    <form
      @submit.prevent="unSubscribe(userData.email)"
      v-if="userData.newsletter"
    >
      <p>Un-subscribe from the newsletter</p>
      <input type="submit" value="Un-Subscribe" />
    </form>
    <form @submit.prevent="subscribe(userData.email)" v-else>
      <p>Subscribe to the newsletter</p>
      <input type="submit" value="Subscribe" />
    </form>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import { apiHelper } from "../../src/components/helpers/api";
const sessionid = useCookie("sessionId");
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
const runtime = useRuntimeConfig().public.baseApiUrl;
const userData = ref({});
const name = ref("");
const surname = ref("");
const password = ref("");
const repeatPassword = ref("");

onMounted(async () => {
  grabNewData();
});

async function grabNewData() {
  const newData = await apiHelper(
    "get",
    useRuntimeConfig(),
    `/user/${sessionid.value}`,
  );
  userData.value = newData;
}

async function modifyName() {
  await axios
    .put(`${runtime}/profile/name`, {
      name: name.value,
      sessionid: sessionid.value,
    })
    .then((response) => {
      console.log(response);
      name.value = "";
      toast.info("Name Changed", {
        autoClose: 1500,
        position: "top-center",
        closeButton: false,
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

async function modifySurname() {
  await axios
    .put(`${runtime}/profile/surname`, {
      surname: surname.value,
      sessionid: sessionid.value,
    })
    .then((response) => {
      console.log(response);
      surname.value = "";
      toast.info("Surname Changed", {
        autoClose: 1500,
        position: "top-center",
        closeButton: false,
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

async function modifyPassword() {
  if (password.value.toString() === repeatPassword.value.toString()) {
    await axios
      .put(`${runtime}/profile/password`, {
        password: password.value,
        sessionid: sessionid.value,
      })
      .then((response) => {
        console.log(response);
        password.value = "";
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
}
async function subscribe(email) {
  console.warn("EMAIL:", email);
  await axios
    .put(`${runtime}/newsletter/add-to-newsletter`, {
      email: email,
    })
    .then((response) => {
      console.log(response);
      grabNewData();
    })
    .catch((error) => {
      console.log(error);
    });
}
async function unSubscribe(email) {
  await axios
    .put(`${runtime}/newsletter/remove-from-newsletter`, {
      email: email,
    })
    .then((response) => {
      console.log(response);
      grabNewData();
    })
    .catch((error) => {
      console.log(error);
    });
}
</script>

<style>
.modifyPage {
  border: 1px solid #ddd;
  padding: 20px;
  margin: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
}

.nameSurnameForm {
  display: flex;
  padding: 20px;
  align-content: space-evenly;
}

form {
  padding: 15px;
  text-align: center;
}

form > p {
  margin-bottom: 15px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}

input[type="submit"] {
  background-color: #74edff;
}

.input {
  background-color: #bff6ff;
}

.formSN {
  width: 50%;
}
</style>
