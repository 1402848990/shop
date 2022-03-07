// 负责人页面

/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import {
  Button,
  List,
  Skeleton,
  Avatar,
  Card,
  Row,
  Col,
  Tag,
  Modal,
  Form,
  Input,
  Select,
  message,
} from 'antd';
import axios from '../../../request/axiosConfig';
import { getContactList } from '../../services';
import { PROVICEOPT, PROVINCE } from '../../utils';
import './index.scss';

const { confirm } = Modal;

class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.state = {
      list: [],
      visible: false,
      contactDetail: {},
    };
  }

  async componentDidMount() {
    this.getUserInfo();
  }

  // 获取区域负责人信息
  getUserInfo = async () => {
    const res = await getContactList();
    this.setState({
      list: res,
    });
  };

  // 提交
  handleSubmit = () => {
    // console.log(this.state.contactDetail);
    console.log('ref', this.formRef.current);
    const { validateFields, setFieldsValue } = this.formRef.current;
    const update = this.state.contactDetail.name;
    const { id } = this.state.contactDetail;
    validateFields().then(async (values) => {
      console.log('values', values);
      values.ownerLocal = PROVINCE[values.ownerLocalId];
      const res = await axios({
        url: update
          ? 'http://localhost:8088/interface/Contact/updateContact'
          : 'http://localhost:8088/interface/Contact/addContact',
        method: 'post',
        data: update ? { ...values, id } : values,
      });
      if (res.success) {
        message.success({
          content: update ? '区域负责人更新成功！' : '区域负责人创建成功！',
        });
        setFieldsValue({});
        this.setState(
          {
            contactDetail: {},
          },
          () => {
            this.setState({
              visible: false,
            });
          }
        );
        this.setState({
          contactDetail: {},
        });
        // 获取最新区域负责人列表
        this.getUserInfo();
      }
    });
  };

  renderTitle = () => (
    <Row type="flex" align="middle">
      <Col span={18}>
        <h3>区域负责人管理</h3>
      </Col>
      <Col style={{ textAlign: 'right' }} className="titleBtn" span={6}>
        <Button
          onClick={() => {
            this.setState({ contactDetail: {} }, () => {
              this.setState({
                visible: true,
              });
            });
          }}
          type="primary"
        >
          +新建区域负责人
        </Button>
      </Col>
    </Row>
  );

  // 删除负责人
  delete = (item) => {
    const _this = this;
    confirm({
      title: `确定删除区域负责人 ${item.name} 吗`,
      content: '',
      async onOk() {
        await axios({
          url: 'http://localhost:8088/interface/Contact/deleteContact',
          method: 'post',
          data: { id: item.id },
        });
        message.success('删除成功！');
        _this.getUserInfo();
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  // 编辑负责人
  edit = (item) => {
    console.log('item', item);
    this.setState({
      visible: true,
      contactDetail: item,
    }, () => {
      const { setFieldsValue } = this.formRef.current;
      setFieldsValue(item);
    });
  };

  render() {
    // const { getFieldDecorator, resetFields } = this.props.form;
    const { list, contactDetail } = this.state;
    console.log('contactDetail', contactDetail);
    return (
      <div className="contact">
        <Card title={this.renderTitle()}>
          <List
            className="demo-loadmore-list"
            // loading={initLoading}
            itemLayout="horizontal"
            pagination={{
              pageSize: 10,
            }}
            dataSource={list}
            renderItem={item => (
              <List.Item
                actions={[
                  <a key="list-loadmore-edit" onClick={() => this.edit(item)}>
                    编辑
                  </a>,
                  <a key="list-loadmore-more" onClick={() => this.delete(item)}>
                    删除
                  </a>,
                ]}
              >
                <Skeleton avatar title={false} loading={item.loading} active>
                  <List.Item.Meta
                    avatar={
                      <Avatar style={{ backgroundColor: '#87d068' }} size={48}>
                        {item.name.split('')[0]}
                      </Avatar>
                    }
                    title={
                      <a href="">
                        {`${item.name}`}&nbsp;&nbsp;&nbsp;&nbsp;
                        {`${item.phone}`}
                      </a>
                    }
                    description={
                      <Row>
                        {/* <Col span={6}>{`邮箱：${item.email || '-'}`}</Col> */}
                        <Col span={6}>{`当前住址：${item.address || '-'}`}</Col>
                        <Col span={6}>{`备注：${item.remark || '-'}`}</Col>
                      </Row>
                    }
                  />
                  <div>
                    <Tag color="magenta">{item.ownerLocal}</Tag>
                  </div>
                </Skeleton>
              </List.Item>
            )}
          />
          <Modal
            width={800}
            title="新建区域负责人"
            visible={this.state.visible}
            onOk={this.handleSubmit}
            onCancel={() => {
              this.setState({ visible: false, contactDetail: {} });
              // resetFields();
            }}
          >
            <Form ref={this.formRef} key={`${contactDetail.name}`} onSubmit={this.handleSubmit}>
              <Row gutter={40}>
                <Col span={12}>
                  {' '}
                  <Form.Item
                    label="姓名"
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: '请输入姓名',
                      },
                    ]}
                  >
                    <Input placeholder="姓名" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  {' '}
                  <Form.Item
                    label="电话"
                    name="phone"
                    rules={[
                      {
                        required: true,
                        message: '请输入电话',
                      },
                    ]}
                  >
                    <Input placeholder="电话" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  {' '}
                  <Form.Item
                    label="性别"
                    name="sex"
                    rules={[
                      {
                        required: true,
                        message: '请选择性别',
                      },
                    ]}
                  >
                    <Select>
                      <Select.Option value="男">男</Select.Option>
                      <Select.Option value="女">女</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  {' '}
                  <Form.Item
                    label="负责区域"
                    name="ownerLocalId"
                    rules={[
                      {
                        required: true,
                        message: '请选择负责区域',
                      },
                    ]}
                  >
                    <Select>
                      {PROVICEOPT().map(i => (
                        <Select.Option value={i.value}>{i.label}</Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  {' '}
                  <Form.Item
                    label="住址"
                    name="address"
                    rules={[
                      {
                        required: true,
                        message: '请输入住址',
                      },
                    ]}
                  >
                    <Input placeholder="住址" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  {' '}
                  <Form.Item
                    label="备注"
                    name="remark"
                  >
                    <Input placeholder="备注" />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Modal>
        </Card>
      </div>
    );
  }
}
export default Contact;
