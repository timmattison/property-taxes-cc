import { defineConfig } from 'vite'

import tailwind from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import path from 'path'
import cssAutoImport from 'vite-plugin-css-auto-import'

const pathSrc = path.resolve(__dirname, 'src')

// https://vitejs.dev/config/
export default defineConfig({
    css: {
        postcss: {
            plugins: [tailwind(), autoprefixer()],
        },
    },
    plugins: [cssAutoImport()],
    resolve: {
        alias: {
            '@': pathSrc,
        },
    },
    test: {
        include: ['**/*.test.ts'],
        globals: true,
    },
})
