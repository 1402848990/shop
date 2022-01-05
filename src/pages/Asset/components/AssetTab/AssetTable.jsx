import React, { useState, useEffect } from 'react';
import { List, message, Avatar, Skeleton, Divider } from 'antd';
import moment from 'moment';

const Index = (props) => {
  const { billList } = props;
  const zfbImg = require('../../../../images/zfb.svg');
  const wxImg = require('../../../../images/wx.svg');

  console.log('billList', billList);

  return (
    <div
      id="scrollableDiv"
      style={{
        height: 600,
        overflow: 'auto',
        padding: '12px 28px',
        border: '1px solid rgba(140, 140, 140, 0.35)',
      }}
    >
      <List
        dataSource={billList}
        renderItem={item => (
          <List.Item key={item.id}>
            <List.Item.Meta
              avatar={<Avatar src={item.payWay ? wxImg : zfbImg} />}
              title={`+ ${item.amount.toFixed(2)}元`}
              description={`订单编号：${item.orderId}`}
            />
            <div>入账时间：{moment(+item.createdAt).format('YYYY-MM-DD HH:mm:ss')}</div>
          </List.Item>
          )}
      />
    </div>
  );
};

export default Index;
