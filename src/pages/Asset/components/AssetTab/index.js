import React, { Component } from 'react';
import { Tab } from '@alifd/next';
import IceContainer from '@icedesign/container';
import AssetTable from './AssetTable';

const detachedContentStyle = {
  borderLeft: 0,
  borderRight: 0,
  borderBottom: 0,
};

export default class Asset extends Component {
  render() {
    const panes = [
      {
        tab: '全部',
        key: 0,
        content: <AssetTable billList={this.props.billList} />,
      },
      {
        tab: '微信',
        key: 1,
        content: <AssetTable billList={this.props.billList?.filter(i => i.payWay)} />,
      },
      {
        tab: '支付宝',
        key: 2,
        content: <AssetTable billList={this.props.billList?.filter(i => !i.payWay)} />,
      },
    ];

    return (
      <IceContainer>
        <Tab size="small" contentStyle={detachedContentStyle}>
          {panes.map((pane) => {
            return (
              <Tab.Item title={pane.tab} key={pane.key}>
                {pane.content}
              </Tab.Item>
            );
          })}
        </Tab>
      </IceContainer>
    );
  }
}
