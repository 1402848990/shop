/* eslint-disable no-restricted-syntax */
import React from 'react';
import { Grid } from '@alifd/next';
import { groupBy } from 'lodash';
import IceContainer from '@icedesign/container';
import DoughnutChart from '../DoughnutChart';
import PieIndex from './pieIndex';
import ColIndex from './columnsIndex';

const { Row, Col } = Grid;


export default function (props) {
  const { goodsList } = props;
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
  console.log('group', group, 'categoryPieVal', categoryPieVal);

  return (
    <IceContainer title="类目分析">
      <Row>
        <Col l="10">
          <h3 style={{ marginBottom: '20px' }}>类目商品种类所占比</h3>
          <PieIndex data={categoryPieVal} />
        </Col>
        <Col l="13" offset="1">
          <h3 style={{ marginBottom: '20px' }}>类目商品种类数量分布</h3>
          <ColIndex data={categoryPieVal} />
        </Col>
      </Row>
    </IceContainer>
  );
}
