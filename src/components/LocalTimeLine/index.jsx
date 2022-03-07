import React from 'react';
import { Timeline } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import './index.scss';

export default function (props) {
  return (<div>
    <Timeline mode="left" style={{ margin: '32px 0 22px 32px' }} classNama="local-time">
      <Timeline.Item color="green">
        Create a services site 2015-09-01
      </Timeline.Item>
      <Timeline.Item color="green">
        Create a services site 2015-09-01
      </Timeline.Item>
      <Timeline.Item color="red">
        <p>Solve initial network problems 1</p>
        <p>Solve initial network problems 2</p>
        <p>Solve initial network problems 3 2015-09-01</p>
      </Timeline.Item>
      <Timeline.Item>
        <p>Technical testing 1</p>
        <p>Technical testing 2</p>
        <p>Technical testing 3 2015-09-01</p>
      </Timeline.Item>
      <Timeline.Item color="gray">
        <p>Technical testing 1</p>
        <p>Technical testing 2</p>
        <p>Technical testing 3 2015-09-01</p>
      </Timeline.Item>
      <Timeline.Item color="gray">
        <p>Technical testing 1</p>
        <p>Technical testing 2</p>
        <p>Technical testing 3 2015-09-01</p>
      </Timeline.Item>
      <Timeline.Item color="#00CCFF" dot={<SmileOutlined />}>
        <p>Custom color testing</p>
      </Timeline.Item>
      <Timeline.Item color="green">
        Create a services site 2015-09-01
      </Timeline.Item>
      <Timeline.Item color="green">
        Create a services site 2015-09-01
      </Timeline.Item>
      <Timeline.Item color="red">
        <p>Solve initial network problems 1</p>
        <p>Solve initial network problems 2</p>
        <p>Solve initial network problems 3 2015-09-01</p>
      </Timeline.Item>
      <Timeline.Item>
        <p>Technical testing 1</p>
        <p>Technical testing 2</p>
        <p>Technical testing 3 2015-09-01</p>
      </Timeline.Item>
      <Timeline.Item color="gray">
        <p>Technical testing 1</p>
        <p>Technical testing 2</p>
        <p>Technical testing 3 2015-09-01</p>
      </Timeline.Item>
      <Timeline.Item color="gray">
        <p>Technical testing 1</p>
        <p>Technical testing 2</p>
        <p>Technical testing 3 2015-09-01</p>
      </Timeline.Item>
      <Timeline.Item color="#00CCFF" dot={<SmileOutlined />}>
        <p>Custom color testing</p>
      </Timeline.Item>
    </Timeline>
          </div>);
}
