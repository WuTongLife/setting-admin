import React, { useEffect, useState } from 'react';
import { Modal, ModalProps, Tree } from 'antd';
import { DataNode } from 'antd/lib/tree';
import { CarryOutOutlined } from '@ant-design/icons';
// import { Scrollbars } from 'react-custom-scrollbars';

declare type TreeData = IUtil.TreeData<Entity.MenuEntity>[];

interface IAssignPermissionProps extends ModalProps {
  treeData: TreeData;
}

const AssignPermissionModal = ({ treeData, ...props }: IAssignPermissionProps) => {
  const getTreeData = (data: TreeData): DataNode[] => {
    return data.map((item) => {
      return {
        title: item.name,
        key: item.menuId,
        icon: <CarryOutOutlined />,
        children: getTreeData(item.children || []),
      };
    });
  };

  return (
    <Modal title="分配权限" {...props}>
      <Tree checkable showLine={{ showLeafIcon: false }} treeData={getTreeData(treeData)} />
    </Modal>
  );
};
export default AssignPermissionModal;
