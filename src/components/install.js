// src/components/install.js
import '@/style/_component.scss'
import RocCustomDatePicker from "./RocCustomDatePicker.vue"
import ClickOutside from '@/utils/directive/clickOutsideDirective.js'

// 定義 install 函式
RocCustomDatePicker.install = function (Vue) {
  Vue.component("RocCustomDatePicker", RocCustomDatePicker).directive('click-outside', ClickOutside)
}

// export 出去
export default RocCustomDatePicker
