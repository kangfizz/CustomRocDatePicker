<template lang="pug">
  button(:class="customClass" @click="emit('click')")
    slot(name="icon")
    slot(name="default")
</template>

<script setup>
import { defineEmits, defineProps } from 'vue'
const emit = defineEmits(['click'])

defineProps({
  customClass: {
    type: String,
    default: 'icon-button'
  },
})
</script>

<style scoped lang="scss">
.icon-button {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px;
  background: none;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #e0e0e0;
  }

  &:focus {
    outline: none;
  }
}

.icon-button svg {
  width: 20px;
  height: 20px;
  color: #333;
}
</style>