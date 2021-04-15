import React from 'react';
import { Form } from 'antd';
import type { ModalProps } from 'antd/lib/modal';
import { FormItemInput, FormItemInputPassword } from '@/components/BaseForm';
import { FormModal } from '@/components/CommonModal';
import { phonePattern } from '@/utils/validate';

interface IUserModalProps extends ModalProps {
  onFinish: (values: any) => void;
  initialValues: any;
}

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const UserModal = ({ onFinish, ...props }: IUserModalProps) => {
  const [form] = Form.useForm();
  return (
    <FormModal
      form={form}
      width={600}
      {...props}
      onOk={form.submit}
      title={props.initialValues ? '编辑用户' : '新增用户'}
    >
      <Form onFinish={onFinish} {...layout} form={form}>
        <FormItemInput label="用户名" name="user_name" rules={[{ required: true }, { whitespace: true }]} />
        {props.initialValues ? null : (
          <FormItemInputPassword
            label="密码"
            name="user_password"
            rules={[{ required: true }, { min: 10 }, { max: 16 }]}
          />
        )}
        <FormItemInput label="昵称" name="user_nickname" rules={[{ required: true }]} />
        <FormItemInput label="邮箱" name="user_email" rules={[{ type: 'email' }]} />
        <FormItemInput label="手机号" name="user_telephone_number" rules={[{ pattern: phonePattern }]} />
        <FormItemInput label="头像" name="user_profile_photo" />
      </Form>
    </FormModal>
  );
};
export default UserModal;
