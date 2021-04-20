import React from 'react';
import { Access } from 'umi';

export const bindAccess = <P extends object>(Component: React.ComponentType<P>) => {
  return class extends React.Component<P & { accessible: boolean }> {
    render() {
      const { accessible, ...props } = this.props;
      // 将 input 组件包装在容器中，而不对其进行修改。Good!
      return (
        <Access accessible={accessible}>
          <Component {...(props as P)} />
        </Access>
      );
    }
  };
};
