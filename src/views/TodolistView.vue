<template>
    <VueLoading :active="isLoading"></VueLoading>
    <header class="container p-4 d-flex justify-content-between align-items-center">
        <h1 class="h2 Baloo-Thambi fw-bold text-center mb-0">
            <img src="../assets/Vector.png" alt="Vector_img">
            ONLINE TODO LIST</h1>
        <div class="header_logout d-flex align-items-center"
        v-if="(token && username) === '' ">
            <a href="index.html" class="me-3 text-dark fs-md-4" id="login"
            @click.prevent="pushLogin">登入</a>
            <a href="index.html" class="text-dark fs-md-4" id="register"
            @click.prevent="pushSignup">註冊</a>
        </div>
        <div class="header_logout d-flex align-items-center" v-else>
            <h2 class="h4 d-none d-md-block mb-0 mx-2">{{ username }}的代辦</h2>
            <a href="index.html" class="text-dark fs-md-4" id="register"
            @click.prevent="logout">登出</a>
        </div>
    </header>
    <main class="container col-12 col-md-8 col-lg-5 p-4 mx-auto"
    v-if="!isLoading">
        <form class="search-bar" id="searchBar" @submit.prevent="checkSame">
            <input type="text" id="todoInput" class="form-control p-3" placeholder="新增待辦事項"
            v-model="inputTodolist">
            <button class="search-btn" id="addTodo_btn" type="submit">
                <i class="bi bi-plus-square-fill"></i>
            </button>
        </form>
        <div class="empty d-flex flex-column align-items-center mt-3"
        v-if="todoList.length === 0">
            <h2 class="h5 pt-6 mt-1">目前尚無待辦事項</h2>
            <img src="../assets/empty1.png" alt="empty_img">
        </div>
        <div class="todoList mt-4" v-else>
            <ul class="nav nav_bar nav-fill justify-content-center" id="list_Bar">
                <li class="options"
                v-for="(item, key) in category" :key="'category' + key"
                @click.prevent="changeType(item)"
                :class="{ 'active': filteredType === item }">{{ item }}</li>
            </ul>
            <div class="content">
                <ul class="list px-0" id="list_items"
                v-for="item in changeTodo" :key="item.id">
                    <li class="d-flex align-items-center justify-content-between">
                    <div class="form-check d-flex align-items-center">
                        <input type="checkbox" class="form-check-input ms-2 me-3"
                        @click.prevent="toggleTodo(item.id)"
                        v-if="item.completed_at === null">
                        <i class="bi bi-check-lg" @click.prevent="toggleTodo(item.id)"
                        v-else></i>
                        <label class="form-check-label mt-1"
                        :class="{ 'active': item.completed_at !== null }">{{ item.content }}</label>
                    </div>
                    <button class="btn-delete"
                    @click.prevent="delTodolist(item)"><i class="bi bi-x-lg"></i></button>
                </li>
                </ul>
            </div>
            <div class="d-flex justify-content-between align-items-center p-4">
                <div class="item_count"><span>{{ changeTodo.length }}</span>個待完成項目</div>
                <a href="#" class="clear" @click.prevent="delTodolistAll">清除已完成項目</a>
            </div>
        </div>
    </main>
</template>

<script setup>
import { useRouter } from 'vue-router';
import {
  ref, onMounted, inject, computed,
} from 'vue';

const swal = inject('$swal');
const axios = inject('axios');
const isLoading = ref(true);
const router = useRouter();

const token = ref('');
const username = ref('');
const category = ref(['全部', '待完成', '已完成']);
const filteredType = ref('全部');
const url = import.meta.env.VITE_API;
const todoList = ref([]);
const inputTodolist = ref('');

function getTodo() {
  axios.get(`${url}todos`)
    .then((res) => {
      todoList.value = res.data.todos;
    });
}

function addTodo() { // 新增TodoList
  const addList = {
    todo: {
      content: inputTodolist.value,
    },
  };
  axios.post(`${url}todos`, addList)
    .then((res) => {
      swal.fire({
        icon: 'success',
        title: '新增完畢',
        text: `以新增${res.data.content}`,
        showConfirmButton: false,
        timer: 500,
      });
      setTimeout(() => {
        getTodo();
      }, 500);
    });
  inputTodolist.value = '';
}

function checkSame() {
  if (inputTodolist.value === '') {
    swal.fire({
      icon: 'error',
      title: '發生錯誤',
      text: '你要新增的項目不可為空 !',
    });
    return;
  }
  const check = todoList.value.some((item) => item.content === inputTodolist.value.trim());
  if (check) {
    swal.fire({
      icon: 'error',
      title: '發生錯誤',
      text: '此待辦您已輸入過，請重新輸入 !',
    });
    inputTodolist.value = '';
  } else {
    addTodo();
  }
}

function toggleTodo(key) { // 切換Todolist狀態
  axios.patch(`${url}todos/${key}/toggle`)
    // eslint-disable-next-line no-unused-vars
    .then((res) => {
      getTodo();
    });
}

function delTodolist(item) { // 刪除單個todoList
  swal.fire({
    icon: 'warning',
    title: '刪除清單選項',
    text: `是否刪除${item.content} 這個清單!`,
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'DELETE!',
  }).then((result) => {
    if (result.isConfirmed) {
      axios.delete(`${url}todos/${item.id}`)
        .then((res) => {
          swal.fire({
            icon: 'success',
            title: `${res.data.message}成功!`,
          });
          getTodo();
        });
    }
  });
}

function delTodolistAll() { // 刪除多個清單
  const deleteItems = todoList.value.filter((item) => item.completed_at !== null)
    .map((item) => item.id);
  if (deleteItems.length === 0) {
    return;
  }
  const deletePromises = deleteItems.map((item) => axios.delete(`${url}todos/${item}`));
  Promise.all(deletePromises)
    .then(() => {
      getTodo();
      swal.fire({
        icon: 'success',
        title: '刪除完畢',
        showConfirmButton: false,
        timer: 1500,
      });
    });
}

function initTokenRender() { // 檢查有無token，若無token不顯示登入後的畫面
  if (token.value !== '') {
    axios.defaults.headers.common.Authorization = token.value;
    getTodo();
  } else {
    swal.fire({
      icon: 'error',
      title: '登入錯誤',
      text: '登入時間過時或還未登入',
      showConfirmButton: false,
      timer: 1500,
    });
    setTimeout(() => {
      router.push('/');
    }, 1500);
  }
}

function pushLogin() { // 切換到登入頁面
  router.push('/');
}
function pushSignup() { // 切換到註冊頁面
  router.push('/signUp');
}

function changeType(item) {
  filteredType.value = item;
}

onMounted(() => {
  token.value = document.cookie.replace(/(?:(?:^|.*;\s*)todoToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
  username.value = document.cookie.replace(/(?:(?:^|.*;\s*)username\s*=\s*([^;]*).*$)|^.*$/, '$1');
  setTimeout(() => {
    isLoading.value = false;
  }, 1500);
  initTokenRender();
});

const changeTodo = computed(() => {
  if (filteredType.value === '全部') {
    return todoList.value;
  } if (filteredType.value === '待完成') {
    const toBeDone = todoList.value.filter((item) => item.completed_at === null);
    return toBeDone;
  }
  const done = todoList.value.filter((item) => item.completed_at !== '' && item.completed_at !== null);
  return done;
});

function logout() { // 使用者登出
  swal.fire({
    icon: 'success',
    title: '使用者登出',
    text: `感謝${username.value}的使用~`,
    showConfirmButton: false,
    timer: 1500,
  });
  setTimeout(() => {
    token.value = '';
    username.value = '';
    document.cookie = 'todoToken=;  max-age=0';
    document.cookie = 'username=; max-age=0';
    pushLogin();
  }, 1500);
}
</script>
