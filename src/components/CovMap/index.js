/* eslint-disable no-restricted-syntax */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Statistic } from 'antd';
import { groupBy, maxBy } from 'lodash';
import moment from 'moment';
import { Grid, Icon, Balloon } from '@alifd/next';
import Lines from './Lines';

const { Row, Col } = Grid;

const labelMap = {
  confirm: '累计确诊最多',
  died: '累计死亡最多',
  curConfirm: '当前确诊最多',
};


export default class Overview extends Component {
  render() {
    const { renderColor, cityData = [], mapKey } = this.props || {};

    const cityMap = groupBy(cityData, 'xArea');
    console.log('mapKey', mapKey);


    const maxObj = maxBy(cityData, (o) => { return +o[mapKey]; }) || {};
    const maxArea = maxObj.xArea;
    const maxNum = maxObj[mapKey];


    const { title = '', col = 4 } = this.props;
    const cols = [
      {
        label: `${labelMap[mapKey]}省份`,
        value: maxArea,
      },
      {
        label: `${labelMap[mapKey]}人数`,
        value: maxNum,
      },
      {
        label: '数据更新时间',
        value: moment(cityData[0]?.relative).format('YYYY-MM-DD HH:mm:ss'),
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
                    valueStyle={{ color: '#c50404' }}
                    prefix={item.icon}
                  />
                </div>
              </Col>
            );
          })}
        </Row>
        <Row>
          <Col l="24">
            <h3>全国疫情地图</h3>
            <br />
            <Lines renderColor={renderColor} mapKey={mapKey} style={{ height: '600px' }} cityMap={cityMap} />
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
