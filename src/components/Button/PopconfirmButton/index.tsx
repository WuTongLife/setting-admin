import { Popconfirm, Button } from 'antd';
import type { ButtonProps, PopconfirmProps } from 'antd';

interface IPopconfirmButtonProps extends Omit<PopconfirmProps, 'title'> {
  buttonProps?: ButtonProps;
  title?: string;
}

const PopconfirmButton = ({ buttonProps, children, ...props }: IPopconfirmButtonProps) => {
  return (
    <Popconfirm title="是否删除这条记录？" okText="是" cancelText="否" {...props}>
      <Button size="small" type="link" danger {...buttonProps}>
        {children}
      </Button>
    </Popconfirm>
  );
};
export default PopconfirmButton;
