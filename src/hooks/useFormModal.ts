import { useBoolean } from 'ahooks';

const useFormModal = <T>(initialValuesRef: React.MutableRefObject<T | undefined>) => {
  // 新增修改时弹窗的状态
  const [visible, { setFalse, setTrue }] = useBoolean(false);

  return {
    setTrue,
    setFalse,
    update: (record: T) => {
      initialValuesRef.current = record;
      setTrue();
    },
    afterClose: () => {
      initialValuesRef.current = undefined;
    },
    visible,
  };
};

export default useFormModal;
