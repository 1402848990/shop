/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import React, { useState, useEffect } from 'react';
import { Column } from '@ant-design/charts';
import { sortBy } from 'lodash';
import moment from 'moment';

export default function Lines(props) {
  const { data = [], yField, stroke, yAxis, fillColor, meta = {} } = props;

  const config = {
    data,
    xField: 'date',
    yField,
    label: {
      // 可手动配置 label 数据标签位置
      position: 'middle',
      // 'top', 'bottom', 'middle',
      // 配置样式
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    columnStyle: {
      fill: fillColor,
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta,
  };
  return <Column {...config} />;
}
