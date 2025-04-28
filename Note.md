# ROCCustomDatePicker

- [DOME PAGE](https://kangfizz.github.io/custom-roc-date-picker/)  
- [介紹的PPT](https://docs.google.com/presentation/d/1dMBd91Q0x08ZSqafdYdMS2pVFvoQpYmjiu9t-CSyET4/edit?hl=zh-tw&slide=id.p#slide=id.p)

- ### 主題:
	- TODO 建立自己定義的套件, 並推上 npm 提供使用
		- 建立一個 民國日曆(ROC date picker) 套件, 便於顯示與選擇
		- 配合 Tailwind css 與 headlessUI, 便於撰寫
		-
	- TODO 在套件上建立相關　Github Page
	- TODO 幫助coding時可以使用的 AI 套件 codeium
-
- ### 使用技術:
	- Vue3
	- Vite
	- Tailwindcss (version 4.x)
	- HeadlessUI
		- 與 primevue 比較 [網址](https://npm-compare.com/@headlessui/vue,primevue,tailwindcss-primeui)
	- SCSS
	- PUG
		- 使用原因: 加快開發速度, 並且讓程式碼看起來簡潔
	- (期望): Typescript
- ### 動機:
	- 因為沒有比較好用的民國年選擇器, 沒有比較輕量化的設計 (比如說可以配合客製化 class or 設計成 icon 按鈕)
	- 挑戰自己, 寫出可客製化且好維護的 package
- ### 設計規劃:
	- 設計兩種類型的
		- 年月日分開型:
		- 單一 Input 型:　(優先做這個的)
			- 客製化 class input
			- 做三個 dialog 顯示 選年份, 選月份, 選日期
			-
	- Slot設計:
		- icon
		-
	- Props設計:
		- placeholder (String: )
		- needIcon (Boolean: true) 加入 是否顯示 icon
		-
	- 如果時間來不及的話,  就建立一個簡單的 select input 就好 (依時間更改計畫, deadline 4/18)
-
- ### 待作項目:
	- DONE 引入 PUG (04/09)
	- DONE 設計民國年邏輯
		- 使用 chatgpt 輔助完成。
	- DONE 引入 ESLint
	- TODO 修改雛形, 改變成月份跟年份皆可選擇
	- DONE 修正style
	- TODO 客製化 style
	- DONE 建立 Github Page
	- TODO 在 codepen 建立使用package的範例頁面
-
- ### 紀錄:
	- 04/15
		- 使用ChatGpt, 先建立一個雛形 (基本的 input 與 calendar的 dialog)
		- 修正 Tailwindcss, 因應版本更改成 4。 (不支援 preprocessor SCSS/SASS)
-
-
- ### 可新增 / 改良項目:
  - 加入切換 日曆類型機制 (西元年/民國年)
  - 客製化 ICON / INPUT style 設計 (或許是幾種主題可提供選擇)
  - 完善結構, 將 calendar 元件化 (日/月/年)
  - 優化判斷邏輯

- 相似package比較:
	- [vue-roc-date-pciker](https://github.com/melodiehsu/vue-roc-date-picker?tab=readme-ov-file)
-
- 參考文獻:
	- [ESLint v9 + vite 安裝](https://muki.tw/eslint-format-onsave-in-vscode/)
	  [PUG官網](https://pugjs.org/api/getting-started.html)


### Publish to NPM package 流程:

- 1. npm run build (預設build)
- 2. npm run release

(第一次的時候需要 `npm login` 之後 `npm publish`)

#### debug
- 可以使用 `npm link` => 在新 project 上 `npm link custom-roc-date-picker`


### 更新Github Page

- 1. npm run build:doc (新建立docs/)
- 2. npm run deploy (使用到 gh-pages 套件幫忙)
