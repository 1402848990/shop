import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import IceContainer from '@icedesign/container';
import { Grid, Icon } from '@alifd/next';

const { Row, Col } = Grid;

const MOCK_DATA = [
  {
    title: '资产管理',
    icon: 'cart',
    color: '#5e83fb',
    to: '/asset',
  },
  {
    title: '商品管理',
    icon: 'cart',
    color: '#f7da47',
    to: '/goods',
  },
  {
    title: '藏品平台管理',
    icon: 'cart',
    color: '#ee706d',
    to: '/PlatformManage',
  },
  {
    title: '订单管理',
    icon: 'cart',
    color: '#58ca9a',
    to: '/orderManage',
  },
  {
    title: '机器/门店管理',
    icon: 'machine',
    color: '#58ca9a',
    to: '/machine',
  },
  {
    title: '预警商品',
    icon: 'cart',
    color: '#d93737',
    to: '/warnGoods',
  },
];

export default class QuickNav extends Component {
  render() {
    return (
      <IceContainer title="便捷导航">
        <Row wrap gutter="20" style={{ marginBottom: '20px' }}>
          {MOCK_DATA.map((item, index) => {
            return (
              <Col xxs="12" s="12" l="8" key={index} style={styles.item}>
                <Link to={item.to} style={styles.link}>
                  <IceContainer
                    style={{ ...styles.card, backgroundColor: item.color }}
                  >
                    <Icon type={item.icon} style={styles.icon} />
                    <div style={styles.title}>{item.title}</div>
                  </IceContainer>
                </Link>
              </Col>
            );
          })}
        </Row>
      </IceContainer>
    );
  }
}

const styles = {
  card: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  link: {
    display: 'block',
    textDecoration: 'none',
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: '5px',
    color: '#fff',
  },
  title: {
    color: '#fff',
    fontSize: '14px',
    fontWeight: '450',
  },
};
