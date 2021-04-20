import { Button, ButtonProps } from 'antd';

const LinkButton = ({ children, ...props }: ButtonProps) => {
  return (
    <Button size="small" type="link" {...props}>
      {children}
    </Button>
  );
};
export default LinkButton;
