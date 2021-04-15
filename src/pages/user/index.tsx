import React, { useMemo } from 'react';
import { Button, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import UserModal from './components/UserModal';
import { useUserTable } from '@/hooks/user';
import { Access, useAccess } from 'umi';

export default () => {
  const { tableProps, userOperate, modalStatus, confirmLoading, initialValuesRef, modalOperate } = useUserTable();
  const access = useAccess();

  const [visible] = modalStatus;

  const columns = useMemo(
    (): ColumnsType<Entity.UserEntity> => [
      { dataIndex: 'username', title: '用户名' },
      { dataIndex: 'nickname', title: '昵称' },
      { dataIndex: ['dept', 'name'], title: '部门' },
      { dataIndex: 'phoneNum', title: '手机号' },
      { dataIndex: 'email', title: '邮箱' },
      { dataIndex: 'createDate', title: '注册时间' },
      { dataIndex: 'status', title: '状态', render: (v) => (v ? '正常' : '禁用') },
      {
        title: '操作',
        width: '200px',
        render: (record) => {
          return (
            <Space>
              <Access accessible={access.system_user_edit}>
                <a onClick={() => modalOperate.update(record)}>编辑</a>
              </Access>
              <Access accessible={access.system_user_delete}>
                <a onClick={() => userOperate.delete(record.user_id)}>删除</a>
              </Access>
            </Space>
          );
        },
      },
    ],
    [userOperate, modalOperate, access],
  );

  return (
    <>
      <Space>
        <Access accessible={access.system_user_add}>
          <Button type="primary" onClick={modalOperate.create}>
            新增
          </Button>
        </Access>
      </Space>
      <Table rowKey="id" columns={columns} {...tableProps} />
      <UserModal
        initialValues={initialValuesRef.current}
        onFinish={userOperate.submit}
        afterClose={modalOperate.afterClose}
        visible={visible}
        onCancel={modalOperate.close}
        confirmLoading={confirmLoading}
      />
    </>
  );
};
