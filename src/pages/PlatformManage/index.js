// 类目页面
/* eslint-disable no-unused-expressions */
import React, { useRef, useState, useEffect } from 'react';
import { Button, Dialog } from '@alifd/next';
import { Form, Input, message, InputNumber } from 'antd';
import {
  deletePlatformApi,
  getPlatformListApi,
  addPlatformApi,
  editPlatformApi,
} from 'services';
import Upload from 'common/Upload';
import Table from './components/Table';
import PageHead from '../../components/PageHead';

export default function Category(props) {
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [currData, setCurrData] = useState({});
  const [fileList, setFileList] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const formRef = useRef();

  console.log('fileList', fileList);

  const onFileChange = (_fileList) => {
    console.log(8888, '_fileList', _fileList);
    setFileList(_fileList);
  };

  // 获取所有平台方法
  const fetchData = async () => {
    setIsLoading(true);
    const res = await getPlatformListApi({ pageSize: 999, pageNum: 1 });
    setIsLoading(false);
    setData(res.rows);
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
        await deletePlatformApi({ id });
        fetchData();
      },
    });
  };

  // 新增类目方法
  const handleOk = () => {
    formRef?.current?.validateFields().then(async (val) => {
      console.log('val', val);
      if (!fileList[0].response) {
        message.error('平台LOGO不能为空');
        return;
      }
      val.logo = fileList[0].response;
      const api = isEdit ? editPlatformApi : addPlatformApi;
      isEdit ? (val.id = currData.id) : null;
      const res = await api(val);
      message.success(isEdit ? '修改成功' : '新增平台成功');
      console.log('res', res);

      onClose();
      fetchData();
    });
  };

  // 弹窗关闭
  const onClose = () => {
    setVisible(false);
    setFileList([]);
    setIsEdit(false);
    setCurrData({});
  };

  // 编辑方法
  const handleEdit = (item) => {
    console.log('item', item, formRef?.current);
    const { name, sortWeight, logo, id } = item;
    setFileList([{ response: logo, thumbUrl: logo }]);
    setIsEdit(true);
    setCurrData({ name, sortWeight, id, logo });
    setVisible(true);
  };

  console.log('currData', currData);

  return (
    <div>
      <PageHead
        title="藏品平台管理"
        buttonText="新增藏品平台"
        onClick={handleClick}
      />

      {/* 新增弹窗 */}
      <Dialog
        title="新增藏品平台"
        visible={visible}
        onOk={handleOk}
        onCancel={onClose}
        onClose={onClose}
        style={{ width: '800px' }}
      >
        <Form
          value={currData}
          ref={formRef}
          name="basic"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={currData}
        >
          <Form.Item
            label="平台名称"
            name="name"
            rules={[{ required: true, message: '请输入平台名!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="平台权重" name="sortWeight">
            <InputNumber style={{ width: '100%' }} min={1} max={99999} />
          </Form.Item>
          <Form.Item
            label="平台LOGO"
            name="logo"
            rules={[{ required: true, message: '请上传平台logo' }]}
          >
            <Upload
              onChange={onFileChange}
              maxCount={1}
              fileList={fileList}
              multiple={false}
            />
          </Form.Item>
        </Form>
      </Dialog>
      {/* 类目展示表格 */}
      <Table
        data={data}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        isLoading={isLoading}
      />
    </div>
  );
}
