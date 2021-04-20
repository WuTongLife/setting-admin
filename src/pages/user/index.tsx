import { useMemo } from 'react';
import { Button, Input } from 'antd';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { SearchOutlined } from '@ant-design/icons';
import UserModal from './components/UserModal';
import { useUserTable } from '@/hooks/user';
import { Access, useAccess } from 'umi';
import WrapPageContainer from '@/components/WrapPageContainer';
import moment from 'moment';

export default () => {
  const { tableProps, userOperate, modalStatus, confirmLoading, initialValuesRef, modalOperate } = useUserTable();
  const access = useAccess();
  const [visible] = modalStatus;

  const columns = useMemo(
    (): ProColumns<Entity.UserEntity>[] => [
      {
        dataIndex: 'username',
        title: '用户名',
        copyable: true,
        filters: true,
        onFilter: true,
        render: (_) => <a>{_}</a>,
        filterDropdown: () => (
          <div style={{ padding: 8 }}>
            <Input style={{ width: 188, marginBottom: 8, display: 'block' }} />
          </div>
        ),
        filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
      },
      { dataIndex: 'nickname', title: '昵称' },
      { dataIndex: ['dept', 'name'], title: '部门' },
      { dataIndex: 'phoneNum', title: '手机号' },
      { dataIndex: 'email', title: '邮箱' },
      {
        dataIndex: 'createDate',
        title: '注册时间',
        sorter: (a, b) => moment(a.createDate).millisecond() - moment(b.createDate).millisecond(),
      },
      { dataIndex: 'status', title: '状态', renderText: (v) => (v ? '正常' : '禁用') },
      {
        title: '操作',
        width: '200px',
        valueType: 'option',
        renderText: (_, record) => {
          return (
            <>
              <Access accessible={access.system_user_edit}>
                <Button size="small" type="link" onClick={() => modalOperate.update(record)}>
                  编辑
                </Button>
              </Access>
              <Access accessible={access.system_user_delete}>
                <Button size="small" type="link" danger onClick={() => userOperate.delete(record.id)}>
                  删除
                </Button>
              </Access>
            </>
          );
        },
      },
    ],
    [userOperate, modalOperate, access],
  );

  return (
    <WrapPageContainer>
      <ProTable
        rowKey="id"
        columns={columns}
        {...tableProps}
        options={{ fullScreen: true }}
        toolBarRender={() => [
          <Access accessible={access.system_user_add}>
            <Button type="primary" onClick={modalOperate.create}>
              新增
            </Button>
          </Access>,
        ]}
      />
      <UserModal
        initialValues={initialValuesRef.current}
        onFinish={userOperate.submit}
        afterClose={modalOperate.afterClose}
        visible={visible}
        onCancel={modalOperate.close}
        confirmLoading={confirmLoading}
      />
    </WrapPageContainer>
  );
};
