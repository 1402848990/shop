import React, { Component } from 'react';
import { Tab } from '@alifd/next';
import IceContainer from '@icedesign/container';
import GlobalTimeLine from '../../../../components/GlobalTimeLine';
import LocalTimeLine from '../../../../components/LocalTimeLine';
import AssetTable from './AssetTable';

const detachedContentStyle = {
  borderLeft: 0,
  borderRight: 0,
  borderBottom: 0,
};

export default class Asset extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('niticeList', this.props.niticeList);
    const panes = [
      {
        tab: '城市列表与疫情数据',
        key: 0,
        content: <AssetTable list={this.props.list} />,
      },
      {
        tab: '本地播报',
        key: 2,
        content: <GlobalTimeLine isCity data={this.props.niticeList || []} />,
      },
    ];

    return (
      <IceContainer>
        <Tab animation size="medium" contentStyle={detachedContentStyle}>
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
