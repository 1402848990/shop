import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Statistic } from 'antd';
import { getTimeStamp } from '../../utils';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { Grid, Icon, Balloon } from '@alifd/next';
import San from './San';

const { Row, Col } = Grid;

export default class Overview extends Component {
  render() {
    const { data: goods = [] } = this.props || {};
    const goodsList = goods.map((i) => {
      let color = 'blue';
      if (i.stock < 20) {
        color = 'red';
      } else if (i.stock < 100) {
        color = '#2196f3';
      } else if (i.stock < 200) {
        color = 'blue';
      }
      return {
        color,
        ...i,
        // nowStock: i.stock - i.salesNum || 0,
      };
    });

    const total = goodsList.reduce((pre, curr) => +pre + +curr.stock, 0);
    const okNum = goodsList.filter(i => !i.stockWarn).length;
    const wranNum = goodsList.filter(i => i.stockWarn).length;

    const { title = '', col = 3 } = this.props;
    const cols = [
      {
        label: '当前库存总量',
        value: total || 0,
        color: 'blue',
      },
      {
        label: '当前安全库存商品种类',
        value: okNum || 0,
        color: 'green',
      },
      {
        label: '库存预警商品种类',
        value: wranNum || 0,
        color: 'red',
      },
    ];
    return (
      <IceContainer title={title}>
        <Row wrap>
          {cols.map((item, index) => {
            const hasBorder = (index + 1) % col !== 0 ? styles.border : {};
            return (
              <Col l={8} key={index} style={{ ...styles.item, ...hasBorder }}>
                <div style={styles.value}>
                  <Statistic
                    title={<h2>{item.label}</h2>}
                    value={item.value}
                    valueStyle={{ color: item.color }}
                  />
                </div>
              </Col>
            );
          })}
        </Row>
        <Row>
          <Col l="24">
            <h3>库存总览</h3>
            <br />
            <San data={goodsList} />
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
