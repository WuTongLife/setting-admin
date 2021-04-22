import { useBoolean } from 'ahooks';
import { Actions } from 'ahooks/lib/useBoolean';

const useFormModal = <T>(
  initialValuesRef?: React.MutableRefObject<T | undefined>,
): [
  Actions & { visible: boolean; update: (record: T) => void; afterClose: () => void },
  Actions & { confirmLoading: boolean },
] => {
  // 新增修改时弹窗的状态
  const [visible, operate] = useBoolean(false);
  // 提交按钮状态
  const [confirmLoading, comfirmOperate] = useBoolean(false);
  return [
    {
      visible,
      ...operate,
      update: (record: T) => {
        if (initialValuesRef?.current) {
          initialValuesRef.current = record;
        }
        operate.setTrue();
      },
      afterClose: () => {
        if (initialValuesRef?.current) {
          initialValuesRef.current = undefined;
        }
      },
    },
    { confirmLoading, ...comfirmOperate },
  ];
};

export default useFormModal;
