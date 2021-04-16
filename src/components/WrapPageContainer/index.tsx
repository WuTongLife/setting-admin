import { PageContainer } from '@ant-design/pro-layout';
import { FC } from 'react';

const WrapPageContainer: FC = ({ children }) => {
  return <PageContainer>{children}</PageContainer>;
};

export default WrapPageContainer;
