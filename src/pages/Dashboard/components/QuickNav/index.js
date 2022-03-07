import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import IceContainer from '@icedesign/container';
import { Grid, Icon } from '@alifd/next';

const { Row, Col } = Grid;

const MOCK_DATA = [
  {
    title: '易感人群：易感老年人及有基础疾病者感染后病情较重',
    icon: 'cart',
    color: '#5e83fb',
    to: '/asset',
  },
  {
    title: '潜伏期：一般为 3～7 天，最长不超过 14 天',
    icon: 'cart',
    color: '#f7da47',
    to: '/goods',
  },
  {
    title: '宿主：野生动物，可能为中华菊头蝠',
    icon: 'cart',
    color: '#ee706d',
    to: '/categoryManage',
  },
  {
    title: '病毒：SARS-CoV-2，其导致疾病命名 COVID-19',
    icon: 'cart',
    color: '#58ca9a',
    to: '/orderManage',
  },
  {
    title: '传染源：新冠肺炎的患者。无症状感染者也可能成为传染源',
    icon: 'machine',
    color: '#58ca9a',
    to: '/machine',
  },
  {
    title: '传播：经呼吸道飞沫接触传播是主要的传播途径气溶胶传播和消化道等传播途径尚待明确',
    icon: 'cart',
    color: '#d93737',
    to: '/warnGoods',
  },
];

export default class QuickNav extends Component {
  render() {
    return (
      <IceContainer title="科普BLOCK">
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
