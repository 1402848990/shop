/* eslint-disable no-restricted-syntax */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Statistic } from 'antd';
import { orderBy, groupBy } from 'lodash';
import { getTimeStamp } from '../../utils';
import {
  ArrowUpOutlined,
  CheckCircleTwoTone,
  SyncOutlined,
  HolderOutlined,
  PauseCircleOutlined,
  CompassOutlined,
} from '@ant-design/icons';
import { Grid, Icon, Balloon } from '@alifd/next';
import './index.scss';

const { Row, Col } = Grid;

export default class Overview extends Component {
  render() {
    const { goodsList, title } = this.props || {};

    goodsList.forEach(i => (i.salesNum ? null : (i.salesNum = 0)));

    const goods = orderBy(goodsList, ['salesNum'], ['desc']).slice(0, 10);
    console.log('goods', goods);


    const categoryPieVal = [];
    const group = groupBy(goodsList, i => i.categoryName);
    for (const [key, list] of Object.entries(group)) {
      categoryPieVal.push({
        name: key,
        value: list?.length || 0,
        num: list?.length || 0,
      });
    }
    const total = categoryPieVal.reduce((pre, curr) => +pre + +curr.value, 0);
    categoryPieVal.forEach((i) => {
      i.value = +(((i.value / total) * 100).toFixed(2));
    });

    return (
      <IceContainer title={title}>
        <Row>
          <Col l="8" offset="4">
            <h2 style={{ color: 'crimson' }}>热销排行榜</h2>
            {goods.map((item, index) => (
              <div className={`paihang paihang${index + 1}`}>
                <span className="order">{index + 1}</span>
                <span className="name">{item.name}</span>
                <span className="salesNum">{item.salesNum}件</span>
              </div>
            ))}
          </Col>
          <Col l="8" offset="4">
            <h2 style={{ color: '#ff5722' }}>热门类目排行榜</h2>
            {categoryPieVal.map((item, index) => (
              <div className={`paihang paihangl${index + 1}`}>
                <span className="order">{index + 1}</span>
                <span className="name">{item.name}</span>
                <span className="salesNum">{item.num}种</span>
              </div>
            ))}
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
