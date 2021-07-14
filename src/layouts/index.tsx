import { Link, useLocation } from 'umi';
import { Layout, Menu } from 'antd';
import { FC } from 'react';
const { Sider, Content } = Layout;
const BasicLayout: FC = ({ children }) => {
  return (
    <Layout
      style={{
        height: window.__POWERED_BY_QIANKUN__ ? 'calc(100vh - 64px)' : '100vh',
        display: 'flex',
      }}
    >
      <Sider theme="light">
        <Menu
          mode="inline"
          onClick={({ key, domEvent }) => {
            if (key === '3') {
              history.pushState({ from: 'root' }, '', '/#/login');
            }
          }}
        >
          <Menu.Item key="1">
            <Link to="/user">用户管理</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/menu">菜单管理</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <a>退出登录</a>
          </Menu.Item>
        </Menu>
      </Sider>
      <Content>{children}</Content>
    </Layout>
  );
};

export default BasicLayout;
