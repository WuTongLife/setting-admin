import { Form } from 'antd';
import type { ModalProps } from 'antd/lib/modal';
import { FormItemInput, FormItemInputNumber } from '@/components/BaseForm';
import { FormModal } from '@/components/CommonModal';

interface IDeptModalProps extends ModalProps {
  onFinish: (values: any) => void;
  initialValues: any;
}

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const DeptModal = ({ onFinish, ...props }: IDeptModalProps) => {
  const [form] = Form.useForm();
  return (
    <FormModal
      form={form}
      width={600}
      {...props}
      onOk={form.submit}
      title={props.initialValues ? '编辑部门' : '新增部门'}
    >
      <Form onFinish={onFinish} {...layout} form={form}>
        <FormItemInput label="部门名称" name="name" rules={[{ required: true }, { whitespace: true }]} />
        <FormItemInput label="部门编码" name="code" rules={[{ required: true }]} />
        <FormItemInputNumber label="排序" name="orderNum" rules={[{ required: true }]} />
      </Form>
    </FormModal>
  );
};
export default DeptModal;
