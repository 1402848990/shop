import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Statistic } from 'antd';
import { getTimeStamp } from '../../../../utils';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { Grid, Icon, Balloon } from '@alifd/next';
import Lines from './Lines';

const { Row, Col } = Grid;

export default class Overview extends Component {
  render() {
    const { orderList = [] } = this.props || {};
    const dayOrder = orderList.filter(
      i => i.createdAt > getTimeStamp().yesterday.end
    );
    const monthVal = orderList.filter(
      i => i.createdAt > getTimeStamp().month.start
    );
    const yearVal = orderList.filter(i => i.createdAt > 1640879999000);
    const { title = '', col = 4 } = this.props;
    const cols = [
      {
        label: '今日订单数',
        value: dayOrder.length || 0,
      },
      {
        label: '当月订单数',
        value: monthVal.length || 0,
      },
      {
        label: '年度订单数',
        value: yearVal.length || 0,
      },
      {
        label: '总订单数',
        value: orderList.length || 0,
      },
    ];
    return (
      <IceContainer title={title}>
        <Row wrap>
          {cols.map((item, index) => {
            const hasBorder = (index + 1) % col !== 0 ? styles.border : {};
            return (
              <Col
                l={24 / col}
                key={index}
                style={{ ...styles.item, ...hasBorder }}
              >
                <div style={styles.value}>
                  <Statistic
                    title={<h2>{item.label}</h2>}
                    value={item.value}
                    valueStyle={{ color: '#3f8600' }}
                    prefix={<ArrowUpOutlined />}
                  />
                </div>
              </Col>
            );
          })}
        </Row>
        <Row>
          <Col l="24">
            <h3>当前月订单趋势</h3>
            <br />
            <Lines data={monthVal} />
          </Col>
        </Row>
      </IceContainer>
    );
  }
}

const styles = {
  item: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '20px 0',
  },
  border: {
    borderRight: '1px solid #F0F0F0',
  },
  title: {
    fontSize: '12px',
    marginBottom: '10px',
  },
  value: {
    fontSize: '22px',
    color: '#333',
  },
};
