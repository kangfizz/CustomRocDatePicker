<script setup>
import RocCustomDatePicker from '@/components/RocCustomDatePicker.vue'
</script>

<template lang="pug">
  // 測試註解
  .text-center.mb-4.text-2xl.font-bold 民國年日期選擇器
  roc-custom-date-picker
    
  //- .flex.flex-nowrap.justify-center.items-center
  //-   a(href="https://vite.dev" target="_blank")
  //-     img.logo(src="/vite.svg" alt="Vite logo")
  //-   a(href="https://vuejs.org/" target="_blank")
  //-     img.logo.vue(src="@/assets/vue.svg" alt="Vue logo")
  //- h1.text-3xl.font-bold.underline.my-4 Hello world!
  //- HelloWorld(msg="Vite + Vue3")
</template>

<style scoped>
.logo {
  padding: 1.5em;
  height: 6em;
  transition: filter 300ms;
  will-change: filter;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
