/* eslint-disable no-unused-expressions */
import React, { useRef, useState, useEffect } from 'react';
import { Button, Dialog } from '@alifd/next';
import { Form, Input } from 'antd';
import Table from './components/Table';
import PageHead from '../../components/PageHead';
import { addCategory, deleteCategory, getCategoryList } from '../../services';

export default function Category(props) {
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const formRef = useRef();

  // 获取所有类目方法
  const fetchData = async () => {
    setIsLoading(true);
    const res = await getCategoryList();
    setIsLoading(false);
    setData(res);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleClick = () => {
    setVisible(true);
  };

  // 删除类目方法
  const handleDelete = (id) => {
    Dialog.confirm({
      title: '提示',
      content: '确认删除吗',
      onOk: async () => {
        await deleteCategory(id);
        fetchData();
      },
    });
  };

  // 新增类目方法
  const handleOk = () => {
    console.log(formRef?.current);
    formRef?.current?.validateFields().then(async (val) => {
      await addCategory(val);
      setVisible(false);
      fetchData();
    });
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <div>
      <PageHead
        title="类目管理"
        buttonText="新增类目"
        onClick={handleClick}
      />
      {/* 新增类目弹窗 */}
      <Dialog
        title="新增类目"
        visible={visible}
        onOk={handleOk}
        onCancel={onClose}
        onClose={onClose}
      >
        <Form
          ref={formRef}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
        >
          <Form.Item
            label="类目名"
            name="categoryName"
            rules={[{ required: true, message: '请输入类目名!' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Dialog>
      {/* 类目展示表格 */}
      <Table data={data} handleDelete={handleDelete} isLoading={isLoading} />
    </div>
  );
}
