<script setup>
import { ref } from 'vue'
const showShop = ref(false)
defineProps({
  money: String,
  buyMultiTap: Function,
  priceMultiTap: String,
  buyAutoClicker: Function,
  priceAutoClicker: String,
  multiTapLevel: String,
  autoClickerLevel: String
})
</script>

<template>
  <div v-if="showShop" class="background">
    <img
      src="/exit.svg"
      class="absolute top-2 left-2 w-12 h-12 cursor-pointer"
      @click="showShop = !showShop"
    />

    <div class="flex items-center justify-between flex-col">
      <span class="text-xs text-gray-100">Твои деньги</span>
      <span
        id="money"
        class="text-6xl text-white font-bold flex h-16 [&>*]:h-14 items-center justify-center"
        ><img src="/bitcoin.svg" alt="money" /><span class="flex items-center justify-center">{{
          money
        }}</span></span
      >
    </div>
    <div class="flex items-center justify-end flex-col w-full h-auto absolute top-[500px] gap-4">
      <div
        class="w-full h-auto bg-[#ffffff4d] rounded-xl bottom-0 flex flex-col [&>span]:flex [&>span]:items-center [&>span]:justify-center [&>span]:gap-2 [&>span]:cursor-pointer [&>span]:transition-all"
      >
        <span class="w-full h-[70px] hover:bg-[#ffffff4d]" @click="buyMultiTap">
          <img src="/tap-finger-svgrepo-com.svg" alt="finger" class="w-12 h-12" />
          <div class="flex items-center justify-between flex-col">
            <span class="text-xs text-gray-100">Мультиклик</span>
            <span class="flex items-center justify-center font-bold text-white"
              ><img src="/bitcoin.svg" alt="price" class="w-8 h-8" />{{ priceMultiTap }}
              <span class="text-xs ml-2 transition" id="multiTap"
                >{{ multiTapLevel }} уровень</span
              ></span
            >
          </div>
        </span>
        <span class="w-full h-[70px] hover:bg-[#ffffff4d]" @click="buyAutoClicker">
          <img src="/bot-svgrepo-com.svg" alt="finger" class="w-12 h-12" />
          <div class="flex items-center justify-between flex-col">
            <span class="text-xs text-gray-100">Автокликер</span>
            <span class="flex items-center justify-center font-bold text-white"
              ><img src="/bitcoin.svg" alt="price" class="w-8 h-8" />{{ priceAutoClicker }}
              <span class="text-xs ml-2 transition" id="autoClicker"
                >{{ autoClickerLevel }} уровень</span
              ></span
            >
          </div>
        </span>

        <span class="w-full h-[50px] hover:bg-[#ffffff4d]">multitap</span>
      </div>
    </div>
  </div>
  <div
    v-if="!showShop"
    class="z-10 absolute w-7/12 h-11 bg-[#ffffff4d] rounded-xl bottom-4 right-4 [&>div]:w-1/3 [&>div]:h-full flex items-center justify-center gap-4 [&>div]:flex [&>div]:cursor-pointer [&>div]:justify-center [&>div]:items-center"
  >
    <div>1</div>
    <div>2</div>
    <div @click="showShop = !showShop"><img src="/shop.svg" alt="shop" class="w-10 h-10" /></div>
  </div>
</template>

<style scoped>
@keyframes showShop {
  0% {
    opacity: 0;
    height: 0;
  }
  100% {
    opacity: 1;
    height: 100%;
  }
}
.background {
  border-radius: 20px;
  z-index: 10;
  color: white;
  height: 100%;
  width: 100%;
  bottom: 0;
  position: absolute;
  animation: showShop 1s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  flex-direction: column;
  background-size: 100% 100%;
  background-position:
    0px 0px,
    0px 0px,
    0px 0px,
    0px 0px,
    0px 0px;
  background-image: radial-gradient(49% 81% at 45% 47%, #ffe20345 2%, #073aff00 100%),
    radial-gradient(113% 91% at 17% -2%, #ecaa8eff 0%, #ff000000 99%),
    radial-gradient(142% 91% at 83% 7%, #af5b5bff 67%, #ff000000 99%),
    radial-gradient(142% 91% at -6% 74%, #ff0049ff 93%, #ff000000 99%),
    radial-gradient(142% 91% at 111% 84%, #ff0000ff 28%, #ff7100ff 88%);
}
</style>
