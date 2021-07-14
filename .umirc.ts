import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  history: { type: 'hash' },
  dynamicImport: {
    loading: '@/components/PageLoading',
  }, // 动态加载
  hash: true,
  routes: [
    {
      path: '/login',
      component: '@/pages/login',
    },
    {
      path: '/',
      component: '@/layouts/index',
      routes: [
        { path: '/', component: '@/pages/index' },
        {
          path: '/user',
          component: '@/pages/user',
          exact: true,
        },
        {
          path: '/menu',
          component: '@/pages/menu',
          exact: true,
        },
      ],
    },
  ],
  fastRefresh: {},
  qiankun: {
    slave: {},
  },
});
