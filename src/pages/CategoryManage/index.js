// 类目页面
/* eslint-disable no-unused-expressions */
import React, { useRef, useState, useEffect } from 'react';
import { Button, Dialog } from '@alifd/next';
import { Form, Input, message, InputNumber, Select } from 'antd';
import {
  deleteCategoryApi,
  getCategoryListApi,
  addCategoryApi,
  editCategoryApi,
  getPlatformListApi,
} from 'services';

import Table from './components/Table';
import PageHead from '../../components/PageHead';

export default function Category(props) {
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [platformList, setPlatformList] = useState([]);
  const [currData, setCurrData] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const formRef = useRef();

  // 获取所有平台方法
  const fetchPlatformData = async () => {
    const res = await getPlatformListApi({ pageSize: 999, pageNum: 1 });
    setPlatformList(res.rows);
  };

  // 获取所有名称方法
  const fetchData = async (value) => {
    setIsLoading(true);
    const res = await getCategoryListApi({ pageSize: 999, pageNum: 1, ...value });
    setIsLoading(false);
    setData(res.rows);
  };

  useEffect(() => {
    fetchData();
    fetchPlatformData();
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
        await deleteCategoryApi({ id });
        fetchData();
      },
    });
  };

  // 新增类目方法
  const handleOk = () => {
    formRef?.current?.validateFields().then(async (val) => {
      console.log('val', val);

      const api = isEdit ? editCategoryApi : addCategoryApi;
      isEdit ? (val.id = currData.id) : null;
      const res = await api(val);
      message.success(isEdit ? '修改成功' : '新增名称成功');
      console.log('res', res);

      onClose();
      fetchData();
    });
  };

  // 弹窗关闭
  const onClose = () => {
    setVisible(false);

    setIsEdit(false);
    setCurrData({});
  };

  // 编辑方法
  const handleEdit = (item) => {
    console.log('item', item, formRef?.current);
    const { name, id, platformId } = item;

    setIsEdit(true);
    setCurrData({ name, platformId, id });
    setVisible(true);
  };

  console.log('currData', currData);

  const handleFilterChange = (value) => {
    fetchData(value);
  };

  return (
    <div>
      <PageHead
        title="藏品名称管理"
        buttonText="新增藏品名称"
        onClick={handleClick}
      />

      {/* 新增弹窗 */}
      <Dialog
        title="新增藏品名称"
        visible={visible}
        onOk={handleOk}
        onCancel={onClose}
        onClose={onClose}
        style={{ width: '500px' }}
      >
        <Form
          value={currData}
          ref={formRef}
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          initialValues={currData}
        >
          <Form.Item
            label="名称"
            name="name"
            rules={[{ required: true, message: '请输入藏品名称' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="选择所属平台" name="platformId" rules={[{ required: true, message: '请选择所属平台' }]}>
            <Select>
              {platformList.map(i => (
                <Select.Option value={i.id} key={i.id}>{i.name}</Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Dialog>
      {/* 类目展示表格 */}
      <Table
        platformList={platformList}
        data={data}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        isLoading={isLoading}
        handleFilterChange={handleFilterChange}
      />
    </div>
  );
}
