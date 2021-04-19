import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  hash: true,
  history: { type: 'hash' },
  antd: {},
  routes: [
    {
      path: '/login',
      exact: true,
      component: '@/pages/login/index',
      layout: false,
    },
    {
      path: '/user',
      name: '用户管理',
      access: 'system_user',
      icon: 'user',
      component: './user/index',
    },
    { path: '/', component: '@/pages/index' },
  ],
  fastRefresh: {},
  dynamicImport: {},
  qiankun: {
    slave: {},
  },
  locale: {
    antd: false,
  },
  theme: {
    '@primary-color': '#3977b1',
  },
  layout: {
    navTheme: 'light',
    locale: false,
    layout: 'mix',
    contentWidth: 'Fluid',
    fixedHeader: true,
    fixSiderbar: true,
    title: '系统管理',
    pwa: false,
    iconfontUrl: '',
    headerHeight: 48,
  },
  proxy: {
    '/api': {
      target: 'http://localhost:3000',
      changeOrigin: true,
      // pathRewrite: { '^/api': '' },
    },
  },
});
