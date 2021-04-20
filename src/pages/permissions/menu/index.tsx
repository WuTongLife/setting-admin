import React, { useMemo } from 'react';
import WrapPageContainer from '@/components/WrapPageContainer';
import ProTable from '@ant-design/pro-table';
import type { ProColumns } from '@ant-design/pro-table';
import { useAccess, useModel } from 'umi';
import useMenu from '@/models/menu';
import MenuModal from './components/MenuModal';
import { AccessButton, AccessLinkButton, AccessPopconfirmButton } from '@/components/Button';

const MenuPage = () => {
  const { treeMenu } = useModel('menu');
  const access = useAccess();
  const { operate, modalOperate, initialValuesRef, confirmLoading, submitOtherParams } = useMenu();

  const createSubMenu = (parentId: number) => {
    submitOtherParams.current = { parentId };
    modalOperate.setTrue();
  };

  const columns = useMemo((): ProColumns<IUtil.TreeData<Entity.MenuEntity>>[] => {
    return [
      { title: '菜单名称', dataIndex: 'name', key: 'name' },
      { title: '路由', dataIndex: 'route', key: 'route' },
      { title: '图标', dataIndex: 'icon', key: 'icon' },
      { title: '菜单类型', dataIndex: 'typeTxt', key: 'typeTxt' },
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
        dataSource={treeMenu}
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
