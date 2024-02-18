<script setup>
import { ref } from 'vue'
import SignUp from './components/SignUp.vue'
import mainWindow from './components/mainWindow.vue'
const isAuth = ref(false)
const idUser = ref('')

function setIdUser(id) {
  idUser.value = id
}
function isAuthEdit(boolean) {
  isAuth.value = boolean
}
</script>

<template>
  <div
    class="w-screen h-screen bg-slate-800 [&>input]:bg-slate-200 [&>input]:p-2 [&>input]:m-2 flex items-center justify-center"
  >
    <component v-if="!isAuth" :is="SignUp" :isAuth="isAuthEdit" :setIdUser="setIdUser" />
    <component v-if="isAuth" :is="mainWindow" :idUser="idUser" />
  </div>
</template>
