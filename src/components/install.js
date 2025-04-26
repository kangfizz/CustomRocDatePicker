// src/components/install.js

import RocCustomDatePicker from "./RocCustomDatePicker.vue"

// 定義 install 函式
RocCustomDatePicker.install = function (Vue) {
  Vue.component("RocCustomDatePicker", RocCustomDatePicker)
}

// export 出去
export default RocCustomDatePicker