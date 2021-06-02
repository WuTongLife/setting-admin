import React, { useEffect, useMemo } from 'react';
import { useAccess, useModel } from 'umi';
import WrapPageContainer from '@/components/WrapPageContainer';
import ProTable from '@ant-design/pro-table';
import type { ProColumns } from '@ant-design/pro-table';
import MenuModal from './components/MenuModal';
import { AccessButton, AccessLinkButton, AccessPopconfirmButton } from '@/components/Button';
import IconFont from '@/components/IconFont';

const MenuPage = () => {
  const {
    treeMenu,
    operate,
    modalOperate,
    initialValuesRef,
    confirmLoading,
    submitOtherParams,
    reload,
    loading,
  } = useModel('menu');
  const access = useAccess();
  const createSubMenu = (parentId: number) => {
    submitOtherParams.current = { parentId };
    modalOperate.setTrue();
  };

  useEffect(() => {
    reload();
  }, []);

  const columns = useMemo((): ProColumns<IUtil.TreeData<Entity.MenuEntity>>[] => {
    return [
      { title: '菜单名称', width: 300, dataIndex: 'name', key: 'name' },
      { title: '路由', width: 300, dataIndex: 'route', key: 'route' },
      {
        title: '图标',
        width: 100,
        dataIndex: 'icon',
        key: 'icon',
        renderText: (v?: string) => (v?.startsWith('icon') ? <IconFont type={v} /> : null),
      },
      { title: '菜单类型', width: 120, dataIndex: 'typeTxt', key: 'typeTxt' },
      { title: '后端权限码', dataIndex: 'perms', key: 'perms' },
      { title: '前端权限码', dataIndex: 'code', key: 'code' },
      { title: '排序', dataIndex: 'orderNum', key: 'orderNum' },
      {
        title: '操作',
        width: '200px',
        valueType: 'option',
        renderText: (_, record) => {
          return (
            <>
              <AccessLinkButton accessible={access.system_menu_add} onClick={() => createSubMenu(record.menuId)}>
                新增
              </AccessLinkButton>
              <AccessLinkButton accessible={access.system_menu_edit} onClick={() => modalOperate.update(record)}>
                编辑
              </AccessLinkButton>
              <AccessPopconfirmButton
                accessible={access.system_menu_delete}
                onConfirm={() => operate.delete(record.menuId)}
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
        dataSource={treeMenu}
        options={{ reload }}
        loading={loading}
        rowKey="menuId"
        bordered
        toolBarRender={() => [
          <AccessButton accessible={access.system_menu_add} type="primary" onClick={modalOperate.setTrue}>
            新增
          </AccessButton>,
        ]}
      />
      <MenuModal
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

export default MenuPage;
