/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import React, { useState, useEffect } from 'react';
import { Line } from '@ant-design/charts';
import { sortBy } from 'lodash';
import moment from 'moment';


export default function Lines(props) {
  const { data = [] } = props;

  const _data = sortBy(data.map((i) => {
    return {
      ...i,
      time: moment(+i.createdAt).format('MM-DD HH:mm:ss'),
    };
  }), 'createdAt');

  console.log('_data', _data);

  const config = {
    data: _data,
    padding: 'auto',
    xField: 'time',
    yField: 'goodsNum',
    tickMethod: 'time',
    smooth: true,
    // xAxis: {
    //   tickCount: 1,
    // },
    slider: {
      start: 0.3,
      end: 0.9,
    },
  };

  return <Line {...config} />;
}
