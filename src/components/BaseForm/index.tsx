import React from 'react';
import { Form, Input, InputNumber, Radio, Select } from 'antd';
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

export const FormItemInputNumber = ({ ...props }: IFormItemProps) => {
  return (
    <FormItem {...props}>
      <InputNumber style={{ width: '100%' }} placeholder={`请输入${props.label}`} />
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

export const FormItemRadio = ({
  radioData,
  ...props
}: { radioData: { value: any; text: React.ReactNode }[] } & IFormItemProps) => {
  return (
    <FormItem {...props}>
      <Radio.Group>
        {radioData.map((item) => (
          <Radio key={item.value} value={item.value}>
            {item.text}
          </Radio>
        ))}
      </Radio.Group>
    </FormItem>
  );
};
