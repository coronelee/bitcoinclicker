<script setup>
import axios from 'axios'
import { ref } from 'vue'
import SignUp from './components/SignUp.vue'

const isAuth = ref(false)
const isAuthEdit = () => {
  isAuth.value = !isAuth.value
}
</script>

<template>
  <div
    class="w-screen h-screen bg-slate-800 [&>input]:bg-slate-200 [&>input]:p-2 [&>input]:m-2 flex items-center justify-center"
  >
    <SignUp :isAuthEdit="isAuthEdit" />
  </div>
</template>
