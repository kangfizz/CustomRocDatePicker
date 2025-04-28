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
      build: {
        outDir: './docs',
        emptyOutDir: true, // also necessary
      },
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
          // 確保外部化處理那些你不想打包進庫的依賴
          external: ['vue'],
          output: {
            // 在 UMD 建構模式下，這些外部化的依賴提供一個全局變量
            globals: {
              vue: 'Vue',
            },
          },
        }
      }
    }
  }
})