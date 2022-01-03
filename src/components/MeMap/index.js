/* eslint-disable no-restricted-syntax */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Statistic } from 'antd';
import { groupBy } from 'lodash';
import { getTimeStamp } from '../../utils';
import { ArrowUpOutlined, CheckCircleTwoTone, SyncOutlined, HolderOutlined, PauseCircleOutlined, CompassOutlined } from '@ant-design/icons';
import { Grid, Icon, Balloon } from '@alifd/next';
import Lines from './Lines';

const { Row, Col } = Grid;


export default class Overview extends Component {
  render() {
    const { data: machineList = [] } = this.props || {};

    let mostCount = 0;
    let mostName = '';

    const group = groupBy(machineList, 'localId');
    const readyList = machineList.filter(i => i.status);
    const stopList = machineList.filter(i => !i.status);

    for (const [key, list] of Object.entries(group)) {
      if (list.length > mostCount) {
        mostCount = list.length;
        mostName = list[0].local;
      }
    }

    console.log('group', group);

    const { title = '', col = 4 } = this.props;
    const cols = [
      {
        label: '机器总数',
        value: machineList.length || 0,
        icon: <HolderOutlined />,
      },
      {
        label: '运行中',
        value: readyList.length || 0,
        icon: <SyncOutlined spin />,
      },
      {
        label: '已停止',
        value: stopList.length || 0,
        icon: <PauseCircleOutlined style={{ color: 'red' }} />,
      },
      {
        label: '最密集区域',
        value: mostName || '',
        icon: <CompassOutlined spin style={{ color: 'blue' }} />,
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
                    prefix={item.icon}
                  />
                </div>
              </Col>
            );
          })}
        </Row>
        <Row>
          <Col l="24">
            <h3>全国布局图</h3>
            <br />
            <Lines style={{ height: '600px' }} group={group} />
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
