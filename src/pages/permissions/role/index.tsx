import React, { useEffect, useMemo } from 'react';
import WrapPageContainer from '@/components/WrapPageContainer';
import ProTable from '@ant-design/pro-table';
import type { ProColumns } from '@ant-design/pro-table';
import { useAccess, useModel } from 'umi';
import { AccessButton, AccessLinkButton, AccessPopconfirmButton } from '@/components/Button';
import RoleModal from './components/RoleModal';

const RolePage = () => {
  const { roleData, fetchAllRoles, operate, modalOperate, initialValuesRef, confirmLoading } = useModel('role');
  const { treeDept } = useModel('department');
  const access = useAccess();

  useEffect(() => {
    fetchAllRoles();
  }, []);

  const columns = useMemo((): ProColumns<Entity.RoleEntity>[] => {
    return [
      { title: '角色名称', dataIndex: 'roleName', key: 'roleName' },
      { title: '所属部门', dataIndex: ['dept', 'name'], key: 'dept' },
      { title: '备注', dataIndex: 'remark', key: 'remark' },
      { title: '创建时间', width: 200, dataIndex: 'createDate', key: 'createDate' },
      {
        title: '操作',
        width: '200px',
        valueType: 'option',
        renderText: (_, record) => {
          return (
            <>
              <AccessLinkButton accessible={access.system_menu_edit} onClick={() => modalOperate.update(record)}>
                编辑
              </AccessLinkButton>
              <AccessPopconfirmButton
                accessible={access.system_menu_delete}
                onConfirm={() => operate.delete(record.roleId)}
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
        dataSource={roleData}
        rowKey="roleId"
        bordered
        toolBarRender={() => [
          <AccessButton accessible={access.system_menu_add} type="primary" onClick={modalOperate.setTrue}>
            新增
          </AccessButton>,
        ]}
      />
      <RoleModal
        treeDept={treeDept}
        initialValues={initialValuesRef.current}
        onFinish={operate.submit}
        afterClose={modalOperate.afterClose}
        visible={modalOperate.visible}
        onCancel={modalOperate.setFalse}
        confirmLoading={confirmLoading}
      />
    </WrapPageContainer>
  );
};

export default RolePage;
