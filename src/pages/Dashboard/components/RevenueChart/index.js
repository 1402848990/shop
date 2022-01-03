/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import moment from 'moment';
import { groupBy, sumBy, sortBy } from 'lodash';
import { Grid, Balloon, Icon } from '@alifd/next';
import DonutChart from './DonutChart';
import { getTimeStamp } from '../../../../utils';
import Line from './Lines';

const { Row, Col } = Grid;

export default class RevenueChart extends Component {
  render() {
    const { billList = [] } = this.props;
    const {
      month: { start },
    } = getTimeStamp();
    const zfbValue = billList
      .filter(i => !i.payWay)
      .reduce((pre, curr) => +pre + +curr.amount, 0);
    const wxValue = billList
      .filter(i => i.payWay)
      .reduce((pre, curr) => +pre + +curr.amount, 0);
    const zfbValueM = billList
      .filter(i => !i.payWay && i.createdAt > start)
      .reduce((pre, curr) => +pre + +curr.amount, 0);
    const wxValueM = billList
      .filter(i => i.payWay && i.createdAt > start)
      .reduce((pre, curr) => +pre + +curr.amount, 0);

    // 支付宝每日分组
    const zfbBillListDay = groupBy(
      billList
        .filter(i => !i.payWay)
        .map((i) => {
          return { ...i, day: moment(+i.createdAt).format('YYYY-MM-DD') };
        }),
      'day'
    );
    // 微信每日分组
    const wxBillListDay = groupBy(
      billList
        .filter(i => i.payWay)
        .map((i) => {
          return { ...i, day: moment(+i.createdAt).format('YYYY-MM-DD') };
        }),
      'day'
    );
    console.log(
      'zfbBillListDay',
      zfbBillListDay,
      'wxBillListDay',
      wxBillListDay
    );

    const zfbData = [];

    for (const i in zfbBillListDay) {
      const { day } = zfbBillListDay[i][0];
      const sub = sumBy(zfbBillListDay[i], 'amount');
      zfbData.push({ date: day, amount: sub });
    }

    const wxData = [];
    for (const i in wxBillListDay) {
      const { day } = wxBillListDay[i][0];
      const sub = sumBy(wxBillListDay[i], 'amount');
      wxData.push({ date: day, amount: sub });
    }

    return (
      <IceContainer title="收入概览分析">
        <Row>
          <Col l="8">
            <DonutChart zfbValue={zfbValue} wxValue={wxValue} />
          </Col>
          <Col l="16">
            <div style={styles.profile}>
              <div style={styles.cell}>
                <div style={styles.head}>
                  <span style={{ ...styles.circle, ...styles.purple }} />
                  <div style={styles.cellTitle}>支付宝总收入</div>
                  <Balloon
                    trigger={<Icon type="prompt" size="small" />}
                    align="t"
                    closable={false}
                    alignEdge
                    triggerType="hover"
                    style={{ width: 300 }}
                  >
                    支付宝总收入
                  </Balloon>
                </div>
                <div style={styles.body}>
                  <span style={styles.costValue}>
                    {zfbValue.toFixed(2) || 0}
                  </span>
                  <span style={styles.costUnit}>元</span>
                </div>
                <div style={styles.footer}>
                  <span style={styles.footerText}>当月</span>
                  <span style={styles.footerValue}>
                    +{zfbValueM.toFixed(2)}元
                  </span>
                </div>
              </div>
              <div style={styles.cell}>
                <div style={styles.head}>
                  <span style={{ ...styles.circle, ...styles.green }} />
                  <div style={styles.cellTitle}>微信总收入</div>
                  <Balloon
                    trigger={<Icon type="prompt" size="small" />}
                    align="t"
                    closable={false}
                    alignEdge
                    triggerType="hover"
                    style={{ width: 300 }}
                  >
                    微信总收入
                  </Balloon>
                </div>
                <div style={styles.body}>
                  <span style={styles.costValue}>
                    {wxValue.toFixed(2) || 0}
                  </span>
                  <span style={styles.costUnit}>元</span>
                </div>
                <div style={styles.footer}>
                  <span style={styles.footerText}>当月</span>
                  <span style={styles.footerValue}>
                    +{wxValueM.toFixed(2)}元
                  </span>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col l="10" offset="1">
            {' '}
            <h3 style={{ marginBottom: '20px' }}>支付宝收入趋势</h3>
            <Line data={sortBy(zfbData, 'date')} />
          </Col>
          <Col l="10" offset="2">
            <h3 style={{ marginBottom: '20px' }}>微信收入折线图趋势</h3>{' '}
            <Line data={sortBy(wxData, 'date')} />
          </Col>
        </Row>
      </IceContainer>
    );
  }
}

const styles = {
  profile: {
    margin: '68px 0',
    display: 'flex',
  },
  head: {
    display: 'flex',
    alignItems: 'center',
  },
  circle: {
    width: '10px',
    height: '10px',
    marginRight: '10px',
    display: 'inline-block',
    borderRadius: '5px',
  },
  purple: {
    background: '#908ce1',
  },
  green: {
    background: '#26c9ad',
  },
  cell: {
    width: '50%',
    padding: '0 10px',
  },
  cellTitle: {
    color: '#666',
    lineHeight: '14px',
    fontSize: '14px',
    marginRight: '5px',
  },
  body: {
    display: 'flex',
    alignItems: 'baseline',
    marginTop: '20px',
  },
  costValue: {
    fontSize: '32px',
    fontWeight: '500',
    lineHeight: '30px',
    height: '30px',
    color: '#333',
  },
  costUnit: {
    marginLeft: '2px',
    fontSize: '12px',
    color: '#333',
  },
  footer: {
    display: 'flex',
    marginTop: '10px',
    fontSize: '14px',
    color: '#999',
  },
  footerText: {
    marginRight: '60px',
  },
};
