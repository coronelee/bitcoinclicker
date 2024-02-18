<script setup>
const props = defineProps({
  isAuth: Function,
  setIdUser: Function
})

import axios from 'axios'
import { ref } from 'vue'
const typeSign = ref('reg')

const addUser = () => {
  const login = document.getElementById('login').value
  const password = document.getElementById('password').value

  if (typeSign.value != 'reg') {
    const repeatPassword = document.getElementById('repeatPassword').value
    if (password != repeatPassword) {
      alert('Пароли не совпадают')
    } else if (login == '' || password == '' || repeatPassword == '') {
      alert('Заполните все поля')
    } else if (login.length < 5 || password.length < 5) {
      alert('Логин или пароль слишком короткие')
    } else {
      axios.post('https://a1d710d803a84bf6.mokky.dev/users', {
        login: login,
        pass: password,
        money: 0,
        multiTaps: 0,
        priceMultiTap: 200,
        autoClickerLevel: 0,
        priceClickerLevel: 1000
      })
    }
  } else if (typeSign.value == 'reg') {
    axios.get('https://a1d710d803a84bf6.mokky.dev/users').then((response) => {
      if (login == '' || password == '') {
        alert('Заполните все поля')
      } else {
        const users = response.data
        for (let i = 0; i < users.length; i++) {
          if (users[i].login == login && users[i].pass == password) {
            props.isAuth(true)
            props.setIdUser(users[i].id)
            break
          } else {
            props.isAuth(false)
          }
        }
      }
    })
  }
}

const switchSign = (type) => {
  if (type == 'in') {
    document.getElementById('sign').classList.add('animate-[editColorL_2s_ease-in-out]')
    typeSign.value = 'reg'
  } else if (type == 'reg') {
    document.getElementById('sign').classList.add('animate-[editColorR_2s_ease-in-out]')
    typeSign.value = 'in'
  }
}
</script>

<template>
  <div
    class="w-96 h-[700px] bg-slate-300 relative flex items-center justify-center flex-col gap-4 p-16 rounded [&>input]:rounded [&>input]:w-full [&>input]:px-2 [&>input]:bg-slate-200 [&>input]:placeholder:text-slate-500"
  >
    <div
      class="flex w-full justify-between h-8 [&>span]:flex items-center rounded transition-all cursor-pointer p-4 text-slate-700 [&>span]:transition-all"
      id="sign"
    >
      <span
        @click="switchSign('reg')"
        v-bind:class="[typeSign == 'in' ? 'border-b-2 text-black' : '']"
        >Регистрация</span
      >
      <span
        @click="switchSign('in')"
        v-bind:class="[typeSign == 'reg' ? 'border-b-2 text-black' : '']"
        >Войти</span
      >
    </div>

    <input type="text" id="login" placeholder="Логин" />
    <input type="text" id="password" placeholder="Пароль" />
    <input
      placeholder="Повторите пароль"
      v-if="typeSign != 'reg'"
      type="text"
      id="repeatPassword"
      class="transition animate-[inputCreate_1s_ease-in-out]"
    />
    <button class="p-2 text-white bg-slate-700 rounded" @click="addUser">Зарегистрироваться</button>
  </div>
</template>
