import { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import useFormModal from '@/hooks/useFormModal';
import { allDepartment, createDepartment, deleteDepartment, updateDepartment } from '@/services/department';
import { toTreeData } from '@/utils/common';
import { useBoolean } from 'ahooks';
import { message } from 'antd';

const toMenuTreeData = toTreeData<Entity.DepartmentEntity>({ primaryKey: 'deptId' });

export default () => {
  const [treeDept, setTreeDept] = useState<IUtil.TreeData<Entity.DepartmentEntity>[]>([]);
  const [loading, loadingAction] = useBoolean(false);
  // 修改时的用户信息
  const initialValuesRef = useRef<Entity.DepartmentEntity>();
  // 新增修改弹窗状态和提交按钮状态
  const [modalOperate, confirmOperate] = useFormModal(initialValuesRef);
  const submitOtherParams = useRef<Partial<Entity.DepartmentEntity>>({ parentId: 0 });
  // 分配权限弹窗状态和提交按钮状态
  const [assignPermisModal, assignPermisConfirm] = useFormModal();

  const fetchAllDepts = useCallback(async () => {
    loadingAction.setTrue();
    const res = await allDepartment();
    if (res.statusCode === 200) {
      setTreeDept(toMenuTreeData(res.data || [], 0));
    }
    loadingAction.setFalse();
  }, []);

  const operate = useMemo(() => {
    const create = async (menu: Entity.DepartmentEntity) => {
      confirmOperate.setTrue();
      try {
        const res = await createDepartment(menu);
        if (res.statusCode === 200) {
          message.success('创建成功');
          modalOperate.setFalse();
          submitOtherParams.current = { parentId: 0 };
          fetchAllDepts();
        }
        confirmOperate.setFalse();
      } catch (error) {
        confirmOperate.setFalse();
      }
    };
    const update = async (menu: Entity.DepartmentEntity) => {
      confirmOperate.setTrue();
      try {
        const res = await updateDepartment(menu);
        if (res.statusCode === 200) {
          message.success('修改成功');
          modalOperate.setFalse();
          fetchAllDepts();
        }
        confirmOperate.setFalse();
      } catch (error) {
        confirmOperate.setFalse();
      }
    };
    return {
      submit: (params: Entity.DepartmentEntity) => {
        if (initialValuesRef.current) {
          update(Object.assign({ ...initialValuesRef.current }, params));
        } else {
          create(Object.assign(params, submitOtherParams.current));
        }
      },
      assignPermission: () => {},
      delete: async (id: number) => {
        const res = await deleteDepartment(id);
        if (res.statusCode === 200) {
          message.success('删除成功');
          fetchAllDepts();
        }
      },
    };
  }, []);

  useEffect(() => {
    fetchAllDepts();
  }, []);

  return {
    treeDept,
    loading,
    modalOperate,
    operate,
    initialValuesRef,
    confirmLoading: confirmOperate.confirmLoading,
    submitOtherParams,
    assignPermisModal,
    assignPermisConfirm,
  };
};