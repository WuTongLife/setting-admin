import { Modal } from 'antd';
import { FormProps } from 'antd/lib/form';
import { ModalProps } from 'antd/lib/modal';
import React, { FC, useEffect } from 'react';

interface IFormModalProps extends ModalProps {
  form: FormProps['form'];
  initialValues?: any;
}

const FormModal: FC<IFormModalProps> = ({ form, initialValues, visible, afterClose, ...props }) => {
  useEffect(() => {
    if (form) {
      if (visible && initialValues) {
        form.setFieldsValue(initialValues);
      } else {
        form.resetFields();
      }
    }
  }, [visible]);
  return <Modal visible={visible} forceRender maskClosable={false} {...props} />;
};
export default FormModal;
