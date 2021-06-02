import React, { useEffect, useMemo } from 'react';
import WrapPageContainer from '@/components/WrapPageContainer';
import ProTable from '@ant-design/pro-table';
import type { ProColumns } from '@ant-design/pro-table';
import { useAccess, useModel } from 'umi';
import { AccessButton, AccessLinkButton, AccessPopconfirmButton } from '@/components/Button';
import DeptModal from './components/DeptModal';
import AssignPermissionModal from '@/components/AssignPermissionModal';

const DepartmentPage = () => {
  const {
    treeDept,
    operate,
    modalOperate,
    submitOtherParams,
    initialValuesRef,
    confirmLoading,
    assignModal,
    fetchAllDepts,
  } = useModel('department');
  const { treeMenu } = useModel('menu');
  const access = useAccess();

  useEffect(() => {
    fetchAllDepts();
  }, []);

  const createSubMenu = (parentId: number) => {
    submitOtherParams.current = { parentId };
    modalOperate.setTrue();
  };

  const columns = useMemo<ProColumns<IUtil.TreeData<Entity.DeptEntity>>[]>(() => {
    return [
      { title: '部门名称', width: 400, dataIndex: 'name', key: 'name' },
      { title: '部门编码', dataIndex: 'code', key: 'code' },
      { title: '排序', dataIndex: 'orderNum', key: 'orderNum' },
      {
        title: '操作',
        width: '300px',
        valueType: 'option',
        renderText: (_, record) => {
          return (
            <>
              <AccessLinkButton accessible onClick={assignModal.modalOperate.setTrue}>
                分配权限
              </AccessLinkButton>
              <AccessLinkButton accessible onClick={() => createSubMenu(record.menuId)}>
                新增
              </AccessLinkButton>
              <AccessLinkButton accessible onClick={() => modalOperate.update(record)}>
                编辑
              </AccessLinkButton>
              <AccessPopconfirmButton
                accessible={access.system_menu_delete}
                onConfirm={() => operate.delete(record.id)}
              >
                删除
              </AccessPopconfirmButton>
            </>
          );
        },
      },
    ];
  }, []);

  return (
    <WrapPageContainer>
      <ProTable
        search={false}
        columns={columns}
        dataSource={treeDept}
        rowKey="deptId"
        bordered
        toolBarRender={() => [
          <AccessButton accessible={access.system_menu_add} type="primary" onClick={modalOperate.setTrue}>
            新增
          </AccessButton>,
        ]}
      />
      <DeptModal
        initialValues={initialValuesRef.current}
        onFinish={operate.submit}
        afterClose={modalOperate.afterClose}
        visible={modalOperate.visible}
        onCancel={modalOperate.setFalse}
        confirmLoading={confirmLoading}
      />
      <AssignPermissionModal
        treeData={treeMenu}
        confirmLoading={assignModal.confirmLoading}
        visible={assignModal.visible}
        onCancel={assignModal.onCancel}
      />
    </WrapPageContainer>
  );
};

export default DepartmentPage;
