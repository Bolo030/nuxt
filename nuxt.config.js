export default {
  env:{
    baseUrl: 'https://api.testing.996110.com/api'
    // baseUrl: process.env.NODE_ENV=='pro'?'https://api.996110.com/api':'https://api.testing.996110.com/api'
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "nuxt-jjn-h5",
    htmlAttrs: {
      lang: "en"
    },
    meta: [
      { charset: "utf-8" },
      {
        name: "viewport",
        content:
          "width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no"
      },
      { hid: "description", name: "description", content: "" }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      { rel: "stylesheet", href: "/css/common.css" },
      { rel: "stylesheet", href: "/css/reset.css" },
      { rel: "stylesheet" , href:'//at.alicdn.com/t/font_2353350_bdz183nryxm.css'}
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/axios.js',
    '~/plugins/request.js',
    '~/plugins/api.js',
    '~/plugins/vue-global.js',
    { src: "@/plugins/lib-flexible", ssr: false },
    { src: '@/plugins/vue-mavon-editor', ssr: false }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    "@nuxt/typescript-build"
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["@nuxtjs/axios", "cookie-universal-nuxt","@nuxtjs/style-resources"],
  styleResources: {
    scss: [
      '~/assets/css/variable.scss'
    ]
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    optimization: {
      runtimeChunk: {
        name: "manifest"
      },
      splitChunks: {
        chunks: "all",
        cacheGroups: {
          libs: {
            name: "chunk-libs",
            chunks: "initial",
            priority: -10,
            reuseExistingChunk: false,
            test: /node_modules\/(.*)\.js/
          },
          styles: {
            name: "chunk-styles",
            test: /\.(scss|css)$/,
            chunks: "all",
            minChunks: 1,
            reuseExistingChunk: true,
            enforce: true
          }
        }
      }
    },
    extractCSS: true,
    postcss: {
      plugins: {
        "postcss-px2rem-exclude": {
          remUnit: 75, // 设计图为750 * height
          remPrecision: 4, // rem的小数点后位数
          exclude: /node_modules|folder_name/i //取消vant组件css转成rem
        }
      }
    }
  },
  loading: { color: '#ff5722', height: ' 3px' },
  router: {
    middleware: ["device"],
    extendRoutes(routes, resolve) {
      routes.push(
        {
          name: "detail",
          path: "/article/detail-:id",
          component: resolve(__dirname, "pages/article/detail.vue")
        },
     /*    {
          name: "article",
          path: "/article/list-:id",
          component: resolve(__dirname, "pages/article/index.vue")
        }, */
        {
          name: "interview",
          path: "/article/interview-:id",
          component: resolve(__dirname, "pages/article/interview.vue")
        }

      );
    }
  }
};
