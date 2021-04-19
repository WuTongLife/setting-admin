import { message, Form, Input, Button } from 'antd';
import React, { useState } from 'react';
import { history, useModel } from 'umi';
import type { LoginParamsType } from '@/services/user';
import { fakeAccountLogin } from '@/services/user';

import styles from './index.less';

const FormItem = Form.Item;

/** 此方法会跳转到 redirect 参数所在的位置 */
const goto = () => {
  if (!history) return;
  setTimeout(() => {
    const { query } = history.location;
    const { redirect } = query as { redirect: string };
    history.push(redirect || '/');
  }, 10);
};

const Login: React.FC = () => {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
  const { initialState, setInitialState } = useModel('@@initialState');
  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    const menuData = await initialState?.fetchPermissions?.();
    if (userInfo) {
      // setCurrentUser(userInfo);
      setInitialState({
        ...initialState,
        currentUser: userInfo,
        menuData,
      });
    }
  };

  const handleSubmit = async (values: LoginParamsType) => {
    setSubmitting(true);
    try {
      // 登录
      const res = await fakeAccountLogin({ ...values });
      if (res.statusCode === 200) {
        message.success('登录成功！');
        localStorage.setItem('token', res.data?.token || '');
        await fetchUserInfo();
        goto();
        return;
      }
    } catch (error) {
      message.error('登录失败，请重试！');
    }
    setSubmitting(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.main}>
          <div className={styles.title}>系统登录</div>
          <Form form={form} onFinish={handleSubmit}>
            <FormItem
              name="username"
              rules={[
                {
                  required: true,
                  message: '请输入用户名',
                },
              ]}
            >
              <Input size="large" placeholder="用户名" />
            </FormItem>
            <FormItem
              name="password"
              rules={[
                {
                  required: true,
                  message: '请输入密码',
                },
              ]}
            >
              <Input.Password size="large" placeholder="密码" />
            </FormItem>
            <a style={{ float: 'right' }}>忘记密码？</a>
            <Button loading={submitting} htmlType="submit" type="primary" size="large">
              登录
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
