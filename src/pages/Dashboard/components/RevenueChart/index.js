import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Grid, Balloon, Icon } from '@alifd/next';
import DonutChart from './DonutChart';
import { getTimeStamp } from '../../../../utils';
import Line from './Lines';

const { Row, Col } = Grid;

export default class RevenueChart extends Component {
  render() {
    const { billList = [] } = this.props;
    const { month: { start } } = getTimeStamp();
    const zfbValue = billList.filter(i => !i.payWay).reduce((pre, curr) => +pre + +curr.amount, 0);
    const wxValue = billList.filter(i => i.payWay).reduce((pre, curr) => +pre + +curr.amount, 0);
    const zfbValueM = billList.filter(i => !i.payWay && i.createdAt > start).reduce((pre, curr) => +pre + +curr.amount, 0);
    const wxValueM = billList.filter(i => i.payWay && i.createdAt > start).reduce((pre, curr) => +pre + +curr.amount, 0);

    return (
      <IceContainer title="收入概览">
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
                  <span style={styles.costValue}>{zfbValue.toFixed(2) || 0}</span>
                  <span style={styles.costUnit}>元</span>
                </div>
                <div style={styles.footer}>
                  <span style={styles.footerText}>当月</span>
                  <span style={styles.footerValue}>+{zfbValueM.toFixed(2)}元</span>
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
                  <span style={styles.costValue}>{wxValue.toFixed(2) || 0}</span>
                  <span style={styles.costUnit}>元</span>
                </div>
                <div style={styles.footer}>
                  <span style={styles.footerText}>当月</span>
                  <span style={styles.footerValue}>+{wxValueM.toFixed(2)}元</span>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col l="10" offset="1"> <Line billList={billList} /></Col>
          <Col l="10" offset="2"> <Line /></Col>
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
