import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Cookie from 'js-cookie';
import IceContainer from '@icedesign/container';
import { Table } from 'antd';
import { Grid } from '@alifd/next';
import './index.scss';

const { Row, Col } = Grid;

export default class Overview extends Component {
  render() {
    const { data = [] } = this.props || {};

    console.log(data);

    const columns = [
      {
        title: '地区',
        dataIndex: 'xArea',
        render: (text, record) => <Link onClick={() => { Cookie.set('cityObj', JSON.stringify(record)); localStorage.setItem('cityObj', JSON.stringify(record)); }} target="_blank" to={`/cityDetail/${JSON.stringify(record)}`} className="tableValue">{text} </Link>,
      },
      {
        title: '现有确诊',
        dataIndex: 'curConfirm',
        sorter: (a, b) => a.curConfirm - b.curConfirm,
        render: text => <span className="tableValue" style={{ color: '#e86d48' }}>{text}</span>,
      },
      {
        title: '累计确诊',
        dataIndex: 'confirm',
        sorter: (a, b) => a.confirm - b.confirm,
        render: text => <span className="tableValue" style={{ color: '#e91e63' }}>{text}</span>,
      },
      {
        title: '无症状',
        dataIndex: 'asymptomatic',
        sorter: (a, b) => a.asymptomatic - b.asymptomatic,
        render: text => <span className="tableValue">{text}</span>,
      },
      {
        title: '境外输入',
        dataIndex: 'overseasInputRelative',
        sorter: (a, b) => a.overseasInputRelative - b.overseasInputRelative,
        render: text => <span className="tableValue">{text}</span>,
      },
      {
        title: '累计治愈',
        dataIndex: 'heal',
        sorter: (a, b) => a.heal - b.heal,
        render: text => <span className="tableValue" style={{ color: '#8bc34a' }}>{text}</span>,
      },
      {
        title: '累计死亡',
        dataIndex: 'died',
        sorter: (a, b) => a.died - b.died,
        render: text => <span className="tableValue" style={{ color: '#9e9e9e' }}>{text}</span>,
      },
    ];

    return (
      <IceContainer>
        <Row>
          <Col l="11">
            <Table pagination={false} columns={columns} dataSource={data?.slice(0, 17) || []} />
          </Col>
          <Col l="11" offset={2}>
            <Table pagination={false} columns={columns} dataSource={data?.slice(18, 34) || []} />
          </Col>
        </Row>
      </IceContainer>
    );
  }
}
