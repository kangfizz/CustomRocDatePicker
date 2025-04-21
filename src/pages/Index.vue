<script setup>
import RocCustomDatePicker from '@/components/RocCustomDatePicker.vue'
// import TestDatePicker from '@/components/TestDatePicker.vue'
import {  ref } from 'vue'

// data
const date = ref('2024/09/05')

</script>

<template lang="pug">
  // 測試註解
  .text-center.mb-4.text-2xl.font-bold 民國年日期選擇器
  roc-custom-date-picker(v-model:date="date")
  //- test-date-picker.mt-4
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
