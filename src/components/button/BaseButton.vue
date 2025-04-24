<template lang="pug">
  button(type="button" :class="customClass" @click="disabled ? undefined : emit('click')" :disabled="disabled")
    slot(name="icon")
    slot(name="default")
</template>

<script setup>
const emit = defineEmits(['click'])

defineProps({
  customClass: {
    type: String,
    default: 'icon-button'
  },
  disabled: {
    type: Boolean,
    default: false
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

  &:disabled {
    background-color: unset !important;
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.icon-button svg {
  width: 20px;
  height: 20px;
  color: #333;
}


</style>