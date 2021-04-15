import React from 'react';
import { Form, Input, Select } from 'antd';
import { FormItemProps } from 'antd/lib/form';
import { SelectProps } from 'antd/lib/select';
const FormItem = Form.Item;

interface IFormItemProps<S = any> extends FormItemProps {}

export const FormItemInput = ({ ...props }: IFormItemProps) => {
  return (
    <FormItem {...props}>
      <Input placeholder={`请输入${props.label}`} />
    </FormItem>
  );
};

export const FormItemTextArea = ({ ...props }: IFormItemProps) => {
  return (
    <FormItem {...props}>
      <Input.TextArea placeholder={`请输入${props.label}`} />
    </FormItem>
  );
};

export const FormItemSelect = ({ selectProps, ...props }: IFormItemProps & { selectProps: SelectProps<any> }) => {
  return (
    <FormItem {...props}>
      <Select placeholder={`请输入${props.label}`} {...selectProps} />
    </FormItem>
  );
};

export const FormItemInputPassword = ({ ...props }: IFormItemProps) => {
  return (
    <FormItem {...props}>
      <Input.Password placeholder={`请输入${props.label}`} />
    </FormItem>
  );
};
