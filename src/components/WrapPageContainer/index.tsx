import { useModel } from '@/.umi/plugin-model/useModel';
import { PageContainer } from '@ant-design/pro-layout';
import { FC } from 'react';
import { useLocation } from 'react-router';

const WrapPageContainer: FC = ({ children, ...props }) => {
  const location = useLocation();
  const { initialState } = useModel('@@initialState');
  console.log(props, location, initialState);
  return <PageContainer pageHeaderRender={() => <div></div>}>{children}</PageContainer>;
};

export default WrapPageContainer;
