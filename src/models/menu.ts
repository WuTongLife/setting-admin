import useFormModal from '@/hooks/useFormModal';
import { allMenus, createMenu, deleteMenu, updateMenu } from '@/services/menu';
import { toTreeData } from '@/utils/common';
import { useBoolean } from 'ahooks';
import { message } from 'antd';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

const toMenuTreeData = toTreeData<Entity.MenuEntity>({ primaryKey: 'menuId' });

const useMenu = () => {
  const [treeMenu, setTreeMenu] = useState<IUtil.TreeData<Entity.MenuEntity>[]>([]);
  const [loading, loadingAction] = useBoolean(false);
  // 修改时的用户信息
  const initialValuesRef = useRef<Entity.MenuEntity>();
  const modalOperate = useFormModal(initialValuesRef);
  // 提交按钮的状态
  const [confirmLoading, submitAction] = useBoolean(false);
  const submitOtherParams = useRef<Partial<Entity.MenuEntity>>({ parentId: 0 });

  const fetchAllRoles = useCallback(async () => {
    loadingAction.setTrue();
    const res = await allMenus();
    if (res.statusCode === 200) {
      setTreeMenu(toMenuTreeData(res.data || [], 0));
    }
    loadingAction.setFalse();
  }, []);

  const operate = useMemo(() => {
    const create = async (menu: Entity.MenuEntity) => {
      submitAction.setTrue();
      try {
        const res = await createMenu(menu);
        if (res.statusCode === 200) {
          message.success('创建成功');
          modalOperate.setFalse();
          submitOtherParams.current = { parentId: 0 };
          fetchAllRoles();
        }
        submitAction.setFalse();
      } catch (error) {
        submitAction.setFalse();
      }
    };
    const update = async (menu: Entity.MenuEntity) => {
      submitAction.setTrue();
      try {
        const res = await updateMenu(menu);
        if (res.statusCode === 200) {
          message.success('修改成功');
          modalOperate.setFalse();
          fetchAllRoles();
        }
        submitAction.setFalse();
      } catch (error) {
        submitAction.setFalse();
      }
    };
    return {
      submit: (params: Entity.MenuEntity) => {
        if (initialValuesRef.current) {
          update(Object.assign({ ...initialValuesRef.current }, params));
        } else {
          create(Object.assign(params, submitOtherParams.current));
        }
      },
      delete: async (id: number) => {
        const res = await deleteMenu(id);
        if (res.statusCode === 200) {
          message.success('删除成功');
          fetchAllRoles();
        }
      },
    };
  }, []);

  useEffect(() => {
    fetchAllRoles();
  }, []);

  return { treeMenu, loading, modalOperate, operate, initialValuesRef, confirmLoading, submitOtherParams };
};

export default useMenu;
