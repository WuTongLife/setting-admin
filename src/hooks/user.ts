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
    const create = (params: Entity.UserEntity) => {
      submitLoading[1].setTrue();
      return userCreate(params)
        .then((res) => {
          if (res.code === 200) {
            message.success('新增成功');
            modalStatus[1].setFalse();
            if (refresh) refresh();
          }
        })
        .finally(() => {
          submitLoading[1].setFalse();
        });
    };
    const update = (params: Entity.UserEntity) => {
      submitLoading[1].setTrue();
      const newParams = { ...params, user_id: initialValuesRef.current?.id };
      return userUpdate(newParams)
        .then((res) => {
          if (res.code === 200) {
            message.success('修改成功');
            modalStatus[1].setFalse();
            if (refresh) refresh();
          }
          submitLoading[1].setFalse();
        })
        .finally(() => {
          submitLoading[1].setFalse();
        });
    };

    return {
      delete: (params: any) =>
        userDelete(params).then((res) => {
          if (res.code === 200) {
            message.success('删除成功');
            if (refresh) refresh();
          } else {
            message.error(res.message);
          }
        }),
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
      update: (record: Entity.UserEntity) => {
        initialValuesRef.current = record;
        setTrue();
      },
      close: () => {
        setFalse();
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
