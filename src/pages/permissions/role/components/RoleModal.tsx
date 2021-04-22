import { Form, TreeSelect } from 'antd';
import type { ModalProps } from 'antd/lib/modal';
import { FormItemInput, FormItemTextArea } from '@/components/BaseForm';
import { FormModal } from '@/components/CommonModal';

declare type TreeData = IUtil.TreeData<Entity.DepartmentEntity>[];

interface IRoleModalProps extends ModalProps {
  onFinish: (values: any) => void;
  initialValues: any;
  treeDept: TreeData;
}

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const { TreeNode } = TreeSelect;

const RoleModal = ({ onFinish, treeDept, ...props }: IRoleModalProps) => {
  const [form] = Form.useForm();

  const renderTreeSelect = (data: TreeData) => {
    return data.map((item) => {
      if (item.children && item.children.length > 0) {
        return (
          <TreeNode key={item.deptId} value={item.deptId} title={item.name}>
            {renderTreeSelect(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode key={item.deptId} value={item.deptId} title={item.name} />;
    });
  };

  return (
    <FormModal
      form={form}
      width={600}
      {...props}
      onOk={form.submit}
      title={props.initialValues ? '编辑角色' : '新增角色'}
    >
      <Form onFinish={onFinish} {...layout} form={form}>
        <FormItemInput label="角色名称" name="roleName" rules={[{ required: true }, { whitespace: true }]} />
        <Form.Item label="部门" name="deptId">
          <TreeSelect showSearch allowClear placeholder="请选择部门">
            {renderTreeSelect(treeDept)}
          </TreeSelect>
        </Form.Item>
        <FormItemTextArea label="备注" name="remark" />
      </Form>
    </FormModal>
  );
};
export default RoleModal;
