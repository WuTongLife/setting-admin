import { Form } from 'antd';
import type { ModalProps } from 'antd/lib/modal';
import { FormItemInput, FormItemInputNumber, FormItemRadio } from '@/components/BaseForm';
import { FormModal } from '@/components/CommonModal';

interface IMenuModalProps extends ModalProps {
  onFinish: (values: any) => void;
  initialValues: any;
}

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const MenuModal = ({ onFinish, ...props }: IMenuModalProps) => {
  const [form] = Form.useForm();
  return (
    <FormModal
      form={form}
      width={600}
      {...props}
      onOk={form.submit}
      title={props.initialValues ? '编辑菜单' : '新增菜单'}
    >
      <Form onFinish={onFinish} {...layout} form={form}>
        <FormItemInput label="菜单名称" name="name" rules={[{ required: true }, { whitespace: true }]} />
        <FormItemInput label="路由" name="route" />
        <FormItemInput label="图标" name="icon" />
        <FormItemRadio
          label="菜单类型"
          name="type"
          initialValue={1}
          radioData={[
            { value: 1, text: '菜单' },
            { value: 2, text: '操作' },
          ]}
          rules={[{ required: true }]}
        />
        <FormItemInput label="后端权限码" name="perms" rules={[{ required: true }]} />
        <FormItemInput label="前端权限码" name="code" rules={[{ required: true }]} />
        <FormItemInputNumber label="排序" name="orderNum" rules={[{ required: true }]} />
      </Form>
    </FormModal>
  );
};
export default MenuModal;
