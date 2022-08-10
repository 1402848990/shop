// 基础表单

/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable no-nested-ternary */
import React, { forwardRef } from 'react';
import { Form, Input, Select, InputNumber, Switch, Button, Radio, DatePicker, Slider } from 'antd';


export default forwardRef((props, ref) => {
  const renderForm = () => {
    const { columns = [], others, onSubmit = () => {} } = props;

    const renderCom = (item) => {
      switch (item.type) {
        case 'select':
          return (
            <Select style={{ width: '100%' }}>
              {item.option.map(i => (
                <Select.Option value={i.value} key={i.value}>
                  {i.label}
                </Select.Option>
              ))}
            </Select>
          );
        case 'inputNumber':
          return (
            <InputNumber {...item.others} style={{ width: '100%' }} />
          );
        case 'switch':
          return <Switch style={{ width: '100px' }} />;
        case 'slider':
          return <Slider tipFormatter={item?.props?.tip || ''} min={item?.props?.min || 0} max={item?.props?.max || 100} style={{ width: '100%' }} />;
        case 'datePicker':
          return <DatePicker style={{ width: '280px' }} />;
        case 'radio':
          return (
            <Radio.Group>
              {item.option.map(i => (
                <Radio key={i.value} key={i.value}>
                  {i.label}
                </Radio>
              ))}
            </Radio.Group>
          );
        default:
          return <Input placeholder={`请输入${item.name}`} />;
      }
    };

    return (
      <Form
        {...others}
        onFinish={onSubmit}
        ref={ref}
        // onValuesChange={(a, b) => {
        //   console.log(a, b);
        // }}
      >
        {columns.map((item) => {
          const valuePropName = item.type === 'switch' ? { valuePropName: 'checked' } : {};
          // 校验规则
          const rules = item.required ? [{
            required: true,
            message: `请输入${item.name}`,
          }] : [];
          return (
            <Form.Item
              {...valuePropName}
              key={item.field}
              label={item.name}
              name={item.field}
              rules={rules}
            >
              {renderCom(item)}
            </Form.Item>
        );
 })}
        <Form.Item wrapperCol={{ offset: 2, span: 4 }}>
          <Button style={{ width: '100%' }} type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    );
  };

  return <>{renderForm()}</>;
});
