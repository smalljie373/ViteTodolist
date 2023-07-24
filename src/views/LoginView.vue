<template>
  <VueLoading :active="isLoading"></VueLoading>
    <main class="container pt-5 pt-md-7">
        <div class="row">
            <div class="col-6 me-5 d-none d-md-block">
                <h1 class="h2 Baloo-Thambi fw-bold text-center">
                <img src="../assets/Vector.png" alt="Vector_img">
                ONLINE TODO LIST</h1>
                <img src="../assets/img.png" alt="Todolist_img" class="d-block m-auto img-fluid">
            </div>
            <div class="col">
                <h2 class="h3 fw-bold mt-5 ps-2 d-none d-md-block">最實用的線上代辦事項服務</h2>
                <div class="d-block d-md-none  text-center">
                <h2 class="h1 Baloo-Thambi fw-bold text-center">
                    <img src="../assets/Vector.png" alt="Vector_img">
                    ONLINE TODO LIST</h2>
                <h3 class="fw-bold mt-3">最實用的線上代辦事項服務</h3>
                </div>
                <form class="container loginForm" @submit.prevent="login">
                    <div class="form-group pt-4">
                        <label for="loginEmail" class="form-label">Email</label>
                        <input type="email" style="height:50px;"
                        class="form-control" id="loginEmail" placeholder="請輸入Email" required
                        v-model="loginUserData.user.email">
                    </div>
                    <div class="form-group pt-4">
                        <label for="loginpassword" class="form-label">密碼</label>
                        <input type="password" style="height:50px;"
                        class="form-control" id="loginpassword" placeholder="請輸入密碼" required
                        v-model="loginUserData.user.password">
                    </div>
                    <div class="d-flex col-4 pt-5 mx-auto flex-column">
                        <input class="btn btn-dark py-md-3" id="loginBtn" type="submit" value="登入">
                        <input class="btn py-md-3" id="loginjoinBtn" type="button" value="註冊帳號"
                        @click.prevent="pushSignup">
                    </div>
                </form>
            </div>
        </div>
    </main>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { inject, ref, onMounted } from 'vue';

const isLoading = ref(true);
const router = useRouter();
const swal = inject('$swal');
function pushSignup() { // 切換到註冊頁面
  router.push('/signUp');
}

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false;
  }, 1500);
});

const url = import.meta.env.VITE_API;
const axios = inject('axios');
const loginUserData = ref({
  user: {
    email: '',
    password: '',
  },
});

function login() {
  axios.post(`${url}users/sign_in`, loginUserData.value).then((res) => {
    swal.fire({
      icon: 'success',
      title: res.data.message,
      text: `歡迎${res.data.nickname}`,
      showConfirmButton: false,
      timer: 1500,
    });
    setTimeout(() => {
      const token = res.headers.authorization;
      const username = res.data.nickname;
      document.cookie = `todoToken=${token};  max-age=1200`;
      document.cookie = `username=${username}; max-age=1200`;
      router.push('/todolist');
    }, 1500);
  })
    .catch((error) => {
      swal.fire({
        icon: 'error',
        title: error.response.data.message,
        text: '帳號不存在或帳號密碼錯誤',
      });
    });
  loginUserData.value = {
    user: {
      email: '',
      password: '',
    },
  };
}
</script>
