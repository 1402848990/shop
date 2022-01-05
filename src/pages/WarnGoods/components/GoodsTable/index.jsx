/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { List, Card, Modal, message, Tag, Avatar } from 'antd';
import { withRouter } from 'react-router-dom';
import IceContainer from '@icedesign/container';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import moment from 'moment';
import './index.scss';
import Filter from '../Filter';
import {
  deleteGood,
  getCategoryList,
  getMachineList,
} from '../../../../services';

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
    if (
      filter?.filter?.isDiscount === true ||
      filter?.filter?.isDiscount === false
    ) {
      filter.filter.isDiscount = +filter?.filter?.isDiscount;
    }

    this.props.fetchGoodsList(filter);
  };

  renderList = (list, stock) => {
    const img = stock
      ? require('../../../../images/stock-warn.svg')
      : require('../../../../images/expires-warn.svg');
    return (
      <List
        locale={{
        emptyText: '非常好~暂无相关告警商品',
      }}
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
          pageSize: 18,
        }}
        dataSource={list}

        renderItem={item => (
          <List.Item>
            <Card
              cover={
                // <Avatar size={100}>{item?.name}</Avatar>
                <img alt="example" src={img} />
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
              title={stock ? item?.name : `${item?.name}—剩【${Math.floor((item.expiresAt - Date.now()) / 1000 / 60 / 60 / 24)}】天`}
            >
              {/* 商品描述 */}
              {this.renderPrice(item)}
              {/* 库存 */}
              <p>
                <span>总库存:{item?.stock}</span>&nbsp;&nbsp;已售:
                <span>{item?.stock}</span>&nbsp;&nbsp;
                {stock ? (
                  <span
                    style={{
                      color: 'white',
                      fontSize: '18px',
                      padding: '4px',
                      borderRadius: '4px',
                      backgroundColor: 'red',
                    }}
                  >
                    余量:{item?.stock}
                  </span>
                ) : (
                  <span>余量:{item?.stock}</span>
                )}
              </p>
              <p
                style={{
                  height: stock ? null : '24px',
                  lineHeight: stock ? null : '24px',
                  color: 'white',
                  background: stock ? '#f39c34' : 'red',
                }}
              >
                过期时间：
                <span style={{ fontSize: stock ? '' : '22px' }}>
                  {' '}
                  {item?.expiresAt
                    ? moment(+item?.expiresAt).format('YYYY-MM-DD')
                    : '-'}
                </span>
              </p>
              <Meta
                className="meta"
                description={
                  <div>
                    {moment(+item?.updatedAt).format('YYYY-MM-DD HH:mm:ss')}{' '}
                    <Tag style={{ marginLeft: '32px' }} color="#87d068">
                      {item.categoryName}
                    </Tag>
                  </div>
                }
              />
            </Card>
          </List.Item>
        )}
      />
    );
  };

  render() {
    return (
      <div className="warnGoods">
        <IceContainer>
          <Filter
            onChange={this.onChange}
            categoryList={this.state.categoryList}
            machineList={this.state.machineList}
          />
        </IceContainer>
        <IceContainer title="库存报警商品 请及时处理！">
          {this.renderList(this.props.stockWarnGoodsList, 'stock')}
        </IceContainer>
        <IceContainer title="临期报警商品 请及时处理！">
          {this.renderList(this.props.expiresWarnGoodsList)}
        </IceContainer>
      </div>
    );
  }
}

export default Tables;
