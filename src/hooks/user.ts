import { userCreate, userDelete, userPageList, userUpdate } from '@/services/user';
import { useBoolean } from 'ahooks';
import { message } from 'antd';
import { useMemo, useRef } from 'react';
import useProTable from './useProTable';

export const useUserTable = () => {
  const tableProps = useProTable<Entity.UserEntity>({ tableAPI: userPageList });
  const refresh = tableProps.actionRef?.current?.reload;

  // 修改时的用户信息
  const initialValuesRef = useRef<Entity.UserEntity>();
  // 新增修改时弹窗的状态
  const modalStatus = useBoolean(false);
  // 提交按钮的状态
  const submitLoading = useBoolean(false);

  /** 用户新增，修改，删除操作 */
  const userOperate = useMemo(() => {
    const create = async (params: Entity.UserEntity) => {
      submitLoading[1].setTrue();
      const res = await userCreate(params);
      if (res.statusCode === 200) {
        message.success('新增成功');
        modalStatus[1].setFalse();
        if (refresh) refresh();
      }
      submitLoading[1].setFalse();
    };

    const update = async (params: Entity.UserEntity) => {
      submitLoading[1].setTrue();
      const newParams = { ...params, user_id: initialValuesRef.current?.id };
      const res = await userUpdate(newParams);
      if (res.statusCode === 200) {
        message.success('修改成功');
        modalStatus[1].setFalse();
        if (refresh) refresh();
      }
      submitLoading[1].setFalse();
    };

    return {
      delete: async (params: any) => {
        const res = await userDelete(params);
        if (res.statusCode === 200) {
          message.success('删除成功');
          if (refresh) refresh();
        } else {
          message.error(res.message);
        }
      },
      submit: (params: Entity.UserEntity) => {
        if (initialValuesRef.current) {
          update(params);
        } else {
          create(params);
        }
      },
    };
  }, [modalStatus, refresh, submitLoading]);

  // 弹窗状态操作
  const modalOperate = useMemo(() => {
    const [, { setFalse, setTrue }] = modalStatus;
    return {
      create: setTrue,
      close: setFalse,
      update: (record: Entity.UserEntity) => {
        initialValuesRef.current = record;
        setTrue();
      },
      afterClose: () => {
        initialValuesRef.current = undefined;
      },
    };
  }, [modalStatus]);

  return {
    tableProps,
    userOperate,
    modalStatus,
    confirmLoading: submitLoading[0],
    initialValuesRef,
    modalOperate,
  };
};
