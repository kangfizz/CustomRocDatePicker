# ROCCustomDatePicker

[DOME PAGE](https://kangfizz.github.io/custom-roc-date-picker/)

## Setup (Vite)

- In `main.js`
````javascript
import CustomRocDatePicker from 'custom-roc-date-picker'
...
...
const myApp = createApp(App)
myApp.use(CustomRocDatePicker)
myApp.mount('#app')
````

- In `tailwind.config.js`
````javascript
  content: [
    ....
    './node_modules/custom-roc-date-picker/**/*.{vue,js,ts,jsx,tsx}',
  ],
````

## Usage

- In `your_page.vue`
````javascript
...
<custom-roc-date-picker v-model:date="date" />
...
````

## Attributes 屬性
- `date`: 日期選擇器綁定值。
- `splitter`: 年月日分隔器
- `placeholder`: Input 預設提示。
- `disabled`: 是否禁止點選。
- `readonly`: 是否 Input 為唯讀狀態 (true 的話將可以點擊後popup calendar) 
- `needInput`: 是否需要 Input (false 的話會只有 icon button)
- `needFuture`: 是否可以選擇未來的日期
- `autoToRocFormat`: 是否自動轉換成 ROC 年格式

| Name                | Description                                | Type                   | Accepted Values                     | Default Value |
|---------------------|--------------------------------------------|------------------------|-------------------------------------|---------------|
| `date`| Binding value.                        | String                 | Any valid string value               | ''            |
| `splitter`              | date string splitter.                   | String                 | Any valid string value                        | '/'        |
| `placeholder`       | Placeholder text.                     | String                 | Any valid string value               | '民國年/月/日'            |
| `disabled`  | Whether the date picker is disabled.                  | Boolean                 | `true` or `false`         | false |
| `readonly`              | readonly status of Input & Button                 | Boolean                 | `true` or `false`              | false        |
| `needInput`      | Whether need Input (false 的話會只有 icon button)           | Boolean                 | `true` or `false` | true            |
| `needFuture`            | Whether can choice future date      | Boolean                 |  `true` or `false`          | false             |
| `autoToRocFormat`   | Whether to change date value to roc date   | Boolean                | `true` or `false`                   | false          |

備註:   
	關於 `autoToRocFormat`參數, 會自動將西元年自動轉換為民國年, 但是僅只是變更並顯示在 Input 上的值, 原本的 `date`仍會是西元年。