import { generateSidebar } from 'vitepress-sidebar'
import { defineConfig } from 'vitepress'

const vitepressSidebarOptions = {
    excludeFolders: ['old', 'boilerplate'],
    sortMenusByFrontmatterDate: true,
    sortMenusOrderByDescending: true,
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "Property Taxes Can't Continue",
    description: "Property taxes are a scam, let's fight them",
    themeConfig: {
        sidebar: generateSidebar(vitepressSidebarOptions),

        // https://vitepress.dev/reference/default-theme-config
        nav: [
            {text: 'Home', link: '/'},
            {text: 'Database', link: '/database/'},
            {text: 'Posts', link: '/posts/'}
        ],

        socialLinks: [
            {icon: 'github', link: 'https://github.com/timmattison/property-taxes-cc'}
        ],

        search: {
            provider: 'local'
        }
    },
    base: '/',
})
