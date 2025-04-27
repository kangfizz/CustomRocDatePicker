import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import tailwindcss from '@tailwindcss/vite'
import eslintPlugin from 'vite-plugin-eslint'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

// https://vite.dev/config/
export default defineConfig(({mode}) => {
  if (mode === 'development') {
    return {
      base: '/custom-roc-date-picker/',
      resolve: {
        alias: {
          '@': resolve(__dirname, 'src'),
        }
      },
      plugins: [
        vue(),
        tailwindcss(),
        eslintPlugin({
          include: ['src/**/*.js', 'src/**/*.vue', 'src/*.js', 'src/*.vue'],
          cache: false
        })
      ],
      css: {
        modules: {
          localsConvention: 'camelCase'
        }
      }
    }
  } else {
    return {
      resolve: {
        alias: {
          '@': resolve(__dirname, 'src'),
        }
      },
      plugins: [vue(), cssInjectedByJsPlugin()],
      build: {
        lib: {
          entry: resolve(__dirname, 'src/components/install.js'),
          name: 'custom-roc-date-picker',
          formats: ["es",  "umd"],
          // the proper extensions will be added
          fileName: format => `custom-roc-date-picker.${format}.js`
        },
        rollupOptions: {
          // 确保外部化处理那些你不想打包进库的依赖
          external: ['vue'],
          output: {
            // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
            globals: {
              vue: 'Vue',
            },
          },
        }
      }
    }
  }
})