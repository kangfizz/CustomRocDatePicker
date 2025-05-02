<script setup>
import RocCustomDatePicker from '@/components/RocCustomDatePicker.vue'
import { ref } from 'vue'

// data
const nullDate = ref(null)
const date = ref('2024/09/05')
const dateSecond = ref('100.01.01')
const dateThird = ref('')

</script>

<template lang="pug">
  .text-center.mb-4.font-bold.text-xl 民國年日期選擇器 (CustomRocDatePicker)
  div.flex.flex-wrap.gap-y-6.max-w-lg
    div.w-full
      div 類型1: 無預設值(null) + readonly
      div.mt-2 選擇日期(民國): 
        span.text-xl {{ nullDate }}
      div
        roc-custom-date-picker(v-model:date="nullDate" readonly)
    div.w-full
      div 類型2: 有預設值(西元) + 自動轉換格式(西元 轉 民國)
      div.mt-2 選擇日期(西元): 
        span.text-xl {{ date }}
      roc-custom-date-picker(v-model:date="date" auto-to-roc-format)
    div.w-full
      div 類型3: 有預設值(民國) + 變更分隔為. + 需要選擇未來日期
      div.mt-2 選擇日期(民國): 
        span.text-xl {{ dateSecond }}
      roc-custom-date-picker(v-model:date="dateSecond" splitter="." need-future)
    div.w-full
      div 類型4: 無預設值('') +  只需要 icon button
      div.mt-2 選擇日期(民國): 
        span.text-xl {{ dateThird }}
      div.flex.justify-center
        roc-custom-date-picker(v-model:date="dateThird" :need-input="false")
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
