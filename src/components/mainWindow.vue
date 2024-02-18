<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import shopOpen from './shopOpen.vue'

const props = defineProps({
  idUser: String
})

const money = ref()
const multiTaps = ref()
const priceMultiTap = ref()
const autoClickerLevel = ref()
const priceClickerLevel = ref()
const user = ref({})

onMounted(() => {
  axios.get('https://a1d710d803a84bf6.mokky.dev/users/' + props.idUser).then((response) => {
    user.value = response.data
    money.value = user.value.money
    priceMultiTap.value = user.value.priceMultiTap
    multiTaps.value = user.value.multiTaps
    autoClickerLevel.value = user.value.autoClickerLevel
    priceClickerLevel.value = user.value.priceClickerLevel
  })

  setInterval(() => {
    money.value = money.value + multiTaps.value * autoClickerLevel.value

    axios.patch('https://a1d710d803a84bf6.mokky.dev/users/' + props.idUser, {
      money: money.value
    })
  }, 1000)
})
let animation = false

const buyAutoClicker = () => {
  if (autoClickerLevel.value == 10) {
    document.getElementById('autoClicker').classList.add('text-red-600')
    setTimeout(() => {
      document.getElementById('autoClicker').classList.remove('text-red-600')
    }, 500)
  } else {
    if (money.value < priceClickerLevel.value) {
      if (!animation) {
        document.getElementById('money').classList.add('animate-[spin_.4s_ease-in-out]')
        animation = !animation
        setTimeout(() => {
          document.getElementById('money').classList.remove('animate-[spin_.4s_ease-in-out]')
          animation = !animation
        }, 400)
      }
    } else {
      money.value -= priceClickerLevel.value
      autoClickerLevel.value++
      priceClickerLevel.value = Math.floor(priceClickerLevel.value * 1.5)
      axios.patch('https://a1d710d803a84bf6.mokky.dev/users/' + props.idUser, {
        autoClickerLevel: autoClickerLevel.value,
        priceClickerLevel: priceClickerLevel.value
      })
    }
  }
}
const buyMultiTap = () => {
  if (multiTaps.value == 10) {
    document.getElementById('multiTap').classList.add('text-red-600')
    setTimeout(() => {
      document.getElementById('multiTap').classList.remove('text-red-600')
    }, 500)
  } else {
    if (money.value < priceMultiTap.value) {
      if (!animation) {
        document.getElementById('money').classList.add('animate-[spin_.4s_ease-in-out]')
        animation = !animation
        setTimeout(() => {
          document.getElementById('money').classList.remove('animate-[spin_.4s_ease-in-out]')
          animation = !animation
        }, 400)
      }
    } else {
      money.value -= priceMultiTap.value
      multiTaps.value++
      priceMultiTap.value = Math.floor(priceMultiTap.value * 1.5)
      axios.patch('https://a1d710d803a84bf6.mokky.dev/users/' + props.idUser, {
        multiTaps: multiTaps.value,
        priceMultiTap: priceMultiTap.value
      })
    }
  }
}

const addMoney = () => {
  money.value = money.value + 1 * multiTaps.value
  axios.patch('https://a1d710d803a84bf6.mokky.dev/users/' + props.idUser, {
    money: money.value
  })

  document.getElementById('bitcoin').classList.add('-translate-y-2')
  setTimeout(() => {
    document.getElementById('bitcoin').classList.remove('-translate-y-2')
  }, 50)
}
</script>

<template>
  <div class="background">
    <shopOpen
      :money="money"
      :buyMultiTap="buyMultiTap"
      :priceMultiTap="priceMultiTap"
      :buyAutoClicker="buyAutoClicker"
      :priceAutoClicker="priceClickerLevel"
      :multiTapLevel="multiTaps"
      :autoClickerLevel="autoClickerLevel"
    />
    <div class="w-full h-full absolute top-0 left-0 flex items-center justify-center flex-col">
      <span class="text-5xl font-bold text-white">{{ money }}₿</span>
      <img
        src="/bitcoin.svg"
        alt="bitcoin"
        class="w-64 h-64 cursor-pointer transition-all"
        @click="addMoney"
        id="bitcoin"
      />
    </div>
  </div>
</template>

<style scoped>
.background {
  width: 24rem;
  height: 700px;
  position: relative;
  border-radius: 20px;
  background-size: 100% 100%;
  background-position:
    0px 0px,
    0px 0px,
    0px 0px,
    0px 0px,
    0px 0px;
  background-image: radial-gradient(49% 81% at 45% 47%, #ffe20345 0%, #073aff00 100%),
    radial-gradient(113% 91% at 17% -2%, #ff5a00ff 1%, #ff000000 99%),
    radial-gradient(142% 91% at 83% 7%, #ffdb00ff 1%, #ff000000 99%),
    radial-gradient(142% 91% at -6% 74%, #ff0049ff 1%, #ff000000 99%),
    radial-gradient(142% 91% at 111% 84%, #ff7000ff 0%, #ff0000ff 100%);
}
@media (max-width: 400px) {
  .background {
    width: 100vw;
    height: 100vh;
  }
}
</style>
