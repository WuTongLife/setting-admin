import { useBoolean } from 'ahooks';
import { useCallback } from 'react';

export const useModal = () => {
  // 新增修改时弹窗的状态
  const [visible, operate] = useBoolean(false);
  // 提交按钮状态
  const [confirmLoading, comfirmOperate] = useBoolean(false);

  const onCancel = useCallback(async () => {
    operate.setFalse();
  }, []);

  return {
    visible,
    confirmLoading,
    onCancel,
    modalOperate: operate,
    comfirmOperate,
  };
};
