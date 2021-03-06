import React, { Component } from 'react';
import { Grid, Icon } from '@alifd/next';
import ColumnChart from './ColumnChart';

const { Row, Col } = Grid;

export default class SalesChart extends Component {
  render() {
    const { orderList, billList, goodsList } = this.props;

    const totalGoodsNum = orderList.reduce((pre, curr) => +pre + +curr.goodsNum, 0);
    const account = billList.reduce((pre, curr) => +pre + +curr.amount, 0);

    const goodsNum = goodsList.reduce((pre, curr) => +pre + +curr.stock, 0);

    const mockData = [
      {
        title: '年度销售数',
        amount: totalGoodsNum,
        percent: '件',
        increase: true,
        color: '#fff',
        borderColor: '#4FD4A4',
        background: '#1BC98E',
      },
      {
        title: '年度订单数',
        amount: orderList.length,
        percent: '个',
        increase: false,
        color: '#fff',
        borderColor: '#EB6C7A',
        background: '#E64758',
      },
      {
        title: '系统商品数',
        amount: goodsNum,
        percent: '件',
        increase: true,
        color: '#fff',
        borderColor: '#B29FFF',
        background: '#9F85FF',
      },
      {
        title: '年度总收入',
        amount: account,
        percent: '元',
        increase: false,
        color: '#fff',
        borderColor: '#E9E063',
        background: '#E5D936',
      },
    ];
    return (
      <Row wrap gutter={20} style={{ marginBottom: '20px' }}>
        {mockData.map((item, index) => {
          return (
            <Col xxs="24" l="6" key={index}>
              <div style={{ ...styles.content, background: item.background }}>
                <div style={styles.summary}>
                  <p style={styles.title}>{item.title}</p>
                  <div style={styles.data}>
                    <h2 style={styles.amount}>{item.amount}</h2>
                    <div style={styles.percent}>
                      {item.percent}{' '}
                      <Icon
                        type={`arrow-${item.increase ? 'up' : 'down'}-filling`}
                        size="xs"
                        style={styles.arrowIcon}
                      />
                    </div>
                  </div>
                </div>
                <ColumnChart color="#fff" />
              </div>
            </Col>
          );
        })}
      </Row>
    );
  }
}

const styles = {
  content: {
    color: '#fff',
    borderRadius: '3px',
  },
  summary: {
    padding: '20px',
  },
  title: {
    margin: '0 0 10px 0',
  },
  data: {
    display: 'flex',
    margin: '10px 0',
  },
  amount: {
    margin: '0 15px 0 0',
    fontSize: '28px',
  },
  percent: {
    display: 'flex',
    alignItems: 'flex-end',
    marginBottom: '4px',
    fontSize: '12px',
  },
  arrowIcon: {
    marginLeft: '8px',
  },
};
