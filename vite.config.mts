import { defineConfig } from 'vite'

import vue from '@vitejs/plugin-vue'

import tailwind from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import path from 'path'

const pathSrc = path.resolve(__dirname, 'src')

// https://vitejs.dev/config/
export default defineConfig({
    css: {
        postcss: {
            plugins: [tailwind(), autoprefixer()],
        },
    },
    resolve: {
        alias: {
            '@': pathSrc,
        },
    },
    plugins: [
        vue(),
    ],
    test: {
        include: ['**/*.test.ts'],
        globals: true,
    },
})
