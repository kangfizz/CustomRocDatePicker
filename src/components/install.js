// src/components/install.js
import '@/style/_component.scss'
import RocCustomDatePicker from "./RocCustomDatePicker.vue"
import BaseButton from './button/BaseButton.vue' 
import ClickOutside from '@/utils/directive/clickOutsideDirective.js'

// 定義 install 函式
RocCustomDatePicker.install = function (Vue) {
  Vue.component("RocCustomDatePicker", RocCustomDatePicker).component("BaseButton", BaseButton).directive('click-outside', ClickOutside)
}

// export 出去
export default RocCustomDatePicker