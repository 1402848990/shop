import React, { useState, useEffect } from 'react';
import { List, message, Avatar, Skeleton, Divider } from 'antd';
import moment from 'moment';

const Index = (props) => {
  const { list } = props;

  const getBGColor = (confirm) => {
    if (confirm < 30) {
      return '#8bc34a';
    } else if (confirm < 80) {
      return '#ffc107';
    } else if (confirm < 200) {
      return '#ff5722';
    }
    return '#eb1303';
  };

  return (
    <div
      id="scrollableDiv"
      style={{
        height: 800,
        overflow: 'auto',
        padding: '12px 28px',
        border: '1px solid rgba(140, 140, 140, 0.35)',
      }}
    >
      <List
        dataSource={list}
        renderItem={item => (
          <List.Item key={item.id}>
            <List.Item.Meta
              avatar={
                <Avatar
                  style={{ background: getBGColor(item.confirm) }}
                  size="large"
                  shape="square"
                >
                  {item.city}
                </Avatar>
              }
              title={
                <div>
                  <span style={{ width: '100px', display: 'inline-block' }}>
                    当前确诊: {item.curConfirm}
                  </span>
                  <span style={{ width: '100px', display: 'inline-block' }}>
                    累计确诊: {item.confirm}
                  </span>
                  <span style={{ width: '150px', display: 'inline-block' }}>
                    无症状感染者: {item.asymptomatic}
                  </span>
                  <span style={{ width: '100px', display: 'inline-block' }}>
                    境外输入: {item.asymptomatic}
                  </span>
                </div>
              }
              description={
                <div>
                  <span style={{ width: '100px', display: 'inline-block' }}>
                    累计治愈: {item.heal}
                  </span>
                  <span style={{ width: '100px', display: 'inline-block' }}>
                    累计死亡: {item.died}
                  </span>
                </div>
              }
            />
            <div style={{ fontSize: '18px', color: '#ff9800', fontWeight: 600 }}>
              城市安全分：{100 - (item.curConfirm * 4 + item.asymptomatic * 2 + item.asymptomatic)}
            </div>
          </List.Item>
        )}
      />
    </div>
  );
};

export default Index;
