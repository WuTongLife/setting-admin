import { Space } from 'antd';
import { FC } from 'react';

const AccessOperate: FC = ({ children }) => {
  return (
    <Space size={[8, 16]} wrap style={{ marginBottom: 0 }}>
      {children}
    </Space>
  );
};

export default AccessOperate;
