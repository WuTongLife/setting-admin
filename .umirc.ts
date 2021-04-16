import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  hash: true,
  antd: {},
  routes: [
    { path: '/', component: '@/pages/index' },
    {
      path: '/user',
      name: '用户管理',
      access: 'system_user',
      icon: 'user',
      component: './user/index',
    },
  ],
  fastRefresh: {},
  qiankun: {
    slave: {},
  },
  locale: {
    antd: false,
  },
  layout: {
    navTheme: 'light',
    locale: false,
    primaryColor: '#1890ff',
    layout: 'mix',
    contentWidth: 'Fluid',
    fixedHeader: false,
    fixSiderbar: true,
    title: '系统管理',
    pwa: false,
    iconfontUrl: '',
    headerHeight: 48,
    splitMenus: false,
  },
  proxy: {
    '/api': {
      target: 'http://localhost:3000',
      changeOrigin: true,
      // pathRewrite: { '^/api': '' },
    },
  },
});
