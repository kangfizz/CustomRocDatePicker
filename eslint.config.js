import globals from "globals"
import pluginJs from "@eslint/js"
import pluginVue from "eslint-plugin-vue"
// import tseslint from "typescript-eslint"
import stylistic from '@stylistic/eslint-plugin'
import pluginVuePug from 'eslint-plugin-vue-pug'

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,vue}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
      }
    },
    plugins: {
      '@stylistic': stylistic,
      vue: pluginVue
    },
    rules: {
      'no-unused-vars': 'warn',
      '@stylistic/indent': ['error', 2],
      '@stylistic/semi': ['error', 'never'],
      '@stylistic/space-before-function-paren': ['error', 'always'],
      'vue/multi-word-component-names': ['error', {
        'ignores': ['Index']
      }],
      "vue/max-attributes-per-line": ["error", {
        "singleline": {
          "max": 3
        },      
        "multiline": {
          "max": 2
        }
      }]
    },
  },
  // JavaScript 推薦設定
  {
    ...pluginJs.configs.recommended,
  },
  // ...tseslint.configs.recommended,
  // Vue 推薦設定
  ...pluginVue.configs["flat/strongly-recommended"],
  // 對 PUG 使用推薦設定
  ...pluginVuePug.configs['flat/recommended'],
  // 對 Vue 文件使用特定的解析器
  // {
  //   files: ["src/**/*.vue"],
  //   languageOptions: {
  //     parserOptions: {
  //       parser: tseslint.parser,
  //     },
  //   }
  // },
]
