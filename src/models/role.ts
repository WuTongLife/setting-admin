import { allRoles, createRole, deleteRole, updateRole } from '@/services/role';
import { useBoolean } from 'ahooks';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import useFormModal from '@/hooks/useFormModal';
import { message } from 'antd';

const useRole = () => {
  const [roleData, setRoleData] = useState<Entity.RoleEntity[]>([]);
  const [loading, loadingAction] = useBoolean(false);
  // 修改时的用户信息
  const initialValuesRef = useRef<Entity.RoleEntity>();
  const [modalOperate] = useFormModal(initialValuesRef);
  // 提交按钮的状态
  const [confirmLoading, submitAction] = useBoolean(false);

  const fetchAllRoles = useCallback(async () => {
    loadingAction.setTrue();
    const res = await allRoles();
    if (res.statusCode === 200) {
      setRoleData(res.data || []);
    }
    loadingAction.setFalse();
  }, []);

  const operate = useMemo(() => {
    const create = async (role: Entity.RoleEntity) => {
      submitAction.setTrue();
      try {
        const res = await createRole(role);
        if (res.statusCode === 200) {
          message.success('创建成功');
          modalOperate.setFalse();
          fetchAllRoles();
        }
        submitAction.setFalse();
      } catch (error) {
        submitAction.setFalse();
      }
    };
    const update = async (role: Entity.RoleEntity) => {
      submitAction.setTrue();
      try {
        const res = await updateRole(role);
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
      submit: (params: Entity.RoleEntity) => {
        if (initialValuesRef.current) {
          update(Object.assign({ ...initialValuesRef.current }, params));
        } else {
          create(params);
        }
      },
      delete: async (id: number) => {
        const res = await deleteRole(id);
        if (res.statusCode === 200) {
          message.success('删除成功');
          fetchAllRoles();
        }
      },
    };
  }, []);

  return { fetchAllRoles, roleData, loading, modalOperate, operate, initialValuesRef, confirmLoading };
};

export default useRole;
