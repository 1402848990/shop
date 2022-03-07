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
            <h3 style={{ color: '#4caf50', fontWeight: 'bold' }}>近七日治愈</h3>
            <br />
            <Lines
              data={sevenData}
              yField="confirmedIncr"
              fillColor="#4caf50"
              meta={{
                date: {
                  alias: '日期',
                },
                confirmedIncr: {
                  alias: '治愈人数',
                },
              }}
            />
          </Col>
          <Col l="10" offset={2}>
            <h3 style={{ color: '#607d8b', fontWeight: 'bold' }}>近七日死亡</h3>
            <br />
            <Lines
              data={sevenData}
              yField="deadIncr"
              fillColor="#607d8b"
              meta={{
                date: {
                  alias: '日期',
                },
                deadIncr: {
                  alias: '死亡人数',
                },
              }}
            />
          </Col>
        </Row>
      </IceContainer>
    );
  }
}
