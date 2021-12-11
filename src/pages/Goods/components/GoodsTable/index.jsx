/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { List, Card, Modal, message, Tag, Avatar } from 'antd';
import { withRouter } from 'react-router-dom';
import IceContainer from '@icedesign/container';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import moment from 'moment';
import './index.scss';
import Filter from '../Filter';
import { deleteGood, getCategoryList, getMachineList } from '../../../../services';

const { confirm } = Modal;
const { Meta } = Card;

@withRouter
class Tables extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // visible: false,
      categoryList: [],
      machineList: [], // 机器列表
    };
  }

  componentDidMount() {
    this.fetchCategoryList();
    this.fetchMachineList();
  }

  // 获取类目列表
  async fetchCategoryList() {
    const res = await getCategoryList();
    this.setState({
      categoryList: res,
    });
  }

  // 获取机器列表
  async fetchMachineList() {
    const res = await getMachineList();
    this.setState({
      machineList: res,
    });
  }

  // 处理删除商品
  delete = (item) => {
    const { fetchGoodsList } = this.props;
    confirm({
      title: `确定删除商品 ${item.name} 吗`,
      content: '',
      async onOk() {
        await deleteGood(item.id);
        message.success('删除成功！');
        // 重新获取列表
        fetchGoodsList();
      },
      onCancel() {},
    });
  };

  // 跳转商品编辑页面
  edit = (item) => {
    this.props.history.push(`edit/goods/${item.id}`);
  };

  // 渲染价格
  renderPrice = item =>
    // 根据是否折扣，分为两种情况
    (item.isDiscount ? (
      <div>
        <span className="discountPrice">
          <i>￥{item?.price}</i>
        </span>
        &nbsp;&nbsp;&nbsp;
        <span style={{ fontSize: '16px', color: 'red', fontWeight: '500' }}>
          ￥{item?.salePrice}
        </span>
      </div>
    ) : (
      <span style={{ fontSize: '16px', color: 'red', fontWeight: '500' }}>
        ￥{item?.price}
      </span>
    ));

  // 处理商品筛选
  onChange = async (filter) => {
    console.log('filter', filter);
    if (filter?.filter?.isDiscount === true || filter?.filter?.isDiscount === false) {
      filter.filter.isDiscount = +filter?.filter?.isDiscount;
    }

    this.props.fetchGoodsList(filter);
  };

  render() {
    const { goodsList } = this.props;

    return (
      <div className="note">
        <IceContainer>
          <Filter
            onChange={this.onChange}
            categoryList={this.state.categoryList}
            machineList={this.state.machineList}
          />
        </IceContainer>
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 4,
            lg: 4,
            xl: 4,
            xxl: 6,
          }}
          className="demo-loadmore-list"
          // loading={initLoading}
          itemLayout="horizontal"
          pagination={{
            pageSize: 10,
          }}
          dataSource={goodsList}
          renderItem={item => (
            <List.Item>
              <Card
                cover={
                  // <Avatar size={100}>{item?.name}</Avatar>
                  <img
                    alt="example"
                    src={require('../../../../images/good.svg')}
                  />
                }
                className="noteCard"
                hoverable
                actions={[
                  <EditOutlined
                    key="edit"
                    onClick={() => this.edit(item)}
                    style={{ color: '#009688' }}
                  />,
                  <DeleteOutlined
                    key="delete"
                    onClick={() => this.delete(item)}
                    style={{ color: '#f35355' }}
                  />,
                ]}
                title={item?.name}
              >
                {/* 商品描述 */}
                {this.renderPrice(item)}
                {/* 库存 */}
                <p>
                  <span>剩余库存:{item?.stock}</span>&nbsp;&nbsp;已售:
                  <span>{item?.salesNum || 0}</span>&nbsp;&nbsp;
                </p>
                <p style={{ color: '#00000073' }}> {item?.desc}</p>
                <p style={{ color: 'white', background: '#f39c34' }}>
                  过期时间：{item?.expiresAt ? moment(+item?.expiresAt).format('YYYY-MM-DD') : '-'}
                </p>
                <Meta
                  className="meta"
                  description={
                    <div>
                      {moment(+item?.updatedAt).format('YYYY-MM-DD HH:mm:ss')}{' '}
                      <Tag style={{ marginLeft: '40px' }} color="#87d068">
                        {item.categoryName}
                      </Tag>
                    </div>
                  }
                />
              </Card>
            </List.Item>
          )}
        />
      </div>
    );
  }
}

export default Tables;
