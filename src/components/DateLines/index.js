import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Statistic } from 'antd';
import { getTimeStamp } from '../../utils';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { Grid, Icon, Balloon } from '@alifd/next';
import Lines from './Lines';

const { Row, Col } = Grid;

export default class Overview extends Component {
  render() {
    const { data = [] } = this.props || {};

    const sevenData = data?.map(i => i?.desc);
    console.log('sevenData', sevenData);

    return (
      <IceContainer>
        <Row>
          <Col l="10">
            <h3 style={{ color: '#e91e63', fontWeight: 'bold' }}>近七日本土新增确诊趋势</h3>
            <br />
            <Lines
              data={sevenData}
              yField="confirmedIncr"
              stroke="#e91e63"
              yAxis={{
                tickInterval: 100,
              }}
              meta={{
                date: {
                  alias: '日期',
                },
                confirmedIncr: {
                  alias: '累计确诊人数',
                },
              }}
            />
          </Col>
          <Col l="10" offset={2}>
            <h3 style={{ color: '#ff5722', fontWeight: 'bold' }}>近七日本土现存确诊趋势</h3>
            <br />
            <Lines
              data={sevenData}
              yField="currentConfirmedCount"
              stroke="#ff5722"
              yAxis={{
                tickInterval: 500,
                minLimit: 5000,
                // maxLimit: 155000,
              }}
              meta={{
                date: {
                  alias: '日期',
                },
                currentConfirmedCount: {
                  alias: '新增确诊人数',
                },
              }}
            />
          </Col>
        </Row>
      </IceContainer>
    );
  }
}
