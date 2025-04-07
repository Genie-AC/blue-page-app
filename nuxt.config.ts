// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    '@nuxt/ui',
    '@pinia/nuxt'
  ],
  
  // imports: {
  //   dirs: ['stores'], 
  // },
  
  // Configure asset handling
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: ''
        }
      }
    },
    // Improve asset resolution
    resolve: {
      alias: {
        '@': '/home/devingray/blue-page-app',
        '~': '/home/devingray/blue-page-app'
      }
    }
  },
  
  // Configure app paths properly
  app: {
    baseURL: '/',
    buildAssetsDir: '/_nuxt/',
    head: {
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' }
      ]
    }
  },
  
  // Configure static assets to be copied to public
  nitro: {
    publicAssets: [
      {
        dir: 'assets',
        baseURL: '/assets'
      }
    ]
  },
  
  // Make sure all assets are properly processed
  experimental: {
    renderJsonPayloads: true
  }
})