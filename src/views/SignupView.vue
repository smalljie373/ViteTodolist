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
              <form class="container registrationForm" @submit.prevent="signUp">
                    <div class="form-group pt-4">
                        <label for="registrationEmail" class="form-label">Email</label>
                        <input type="email" style="height:50px;"
                        class="form-control" id="registrationEmail" placeholder="請輸入Email" required
                        v-model="registrationData.user.email">
                    </div>
                    <div class="form-group pt-4">
                        <label for="registrationname" class="form-label">您的暱稱</label>
                        <input type="text" style="height:50px;"
                        class="form-control" id="registrationName" placeholder="請輸入您的暱稱" required
                        v-model="registrationData.user.nickname">
                    </div>
                    <div class="form-group pt-4">
                        <label for="registrationpassword" class="form-label">密碼</label>
                        <input type="password" style="height:50px;"
                        class="form-control" id="registrationPassword" placeholder="請輸入密碼" required
                        v-model="registrationData.user.password">
                    </div>
                    <div class="form-group pt-4">
                        <label for="passwordConfirm" class="form-label">再次輸入密碼</label>
                        <input type="password" style="height:50px;"
                        class="form-control" id="passwordConfirm" placeholder="請再次輸入密碼" required
                        v-model="passwordAgain">
                    </div>
                    <div class="d-flex col-4 pt-5 mx-auto flex-column">
                        <input class="btn btn-dark py-md-3"
                        id="registrationBtn" type="submit" value="註冊帳號">
                        <input class="btn py-md-3" id="registrationloginBtn"
                        type="button" value="登入" @click.prevent="pushLogin">
                    </div>
                </form>
          </div>
      </div>
  </main>

</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref, inject, onMounted } from 'vue';

const swal = inject('$swal');
const router = useRouter();
const isLoading = ref(true);
function pushLogin() {
  router.push('/');
}
const url = import.meta.env.VITE_API;
const axios = inject('axios');

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false;
  }, 1500);
});

const registrationData = ref({
  user: {
    email: '',
    nickname: '',
    password: '',
  },
});
const passwordAgain = ref('');
function signUp() {
  if (passwordAgain.value !== registrationData.value.user.password) {
    swal.fire({
      icon: 'error',
      title: '註冊錯誤',
      text: '註冊密碼不同',
    });
  } else {
    axios.post(`${url}users`, registrationData.value)
      .then((res) => {
        swal.fire({
          icon: 'success',
          title: res.data.message,
          text: `帳號名稱:${res.data.nickname}，註冊成功，並於3秒後返回登入頁面!`,
          showConfirmButton: false,
          timer: 3000,
        });
        setTimeout(() => {
          pushLogin();
        }, 3000);
      }).catch((error) => {
        swal.fire({
          icon: 'error',
          title: error.response.data.message,
          text: error.response.data.error[0],
        });
      });
  }
  registrationData.value = {
    user: {
      email: '',
      nickname: '',
      password: '',
    },
  };
  passwordAgain.value = '';
}

</script>
