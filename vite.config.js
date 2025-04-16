import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import tailwindcss from '@tailwindcss/vite'
import eslintPlugin from 'vite-plugin-eslint'

// https://vite.dev/config/
export default defineConfig({
  base: './',
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
})
