/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import React, { useState, useEffect } from 'react';
import { Line } from '@ant-design/charts';


export default function Lines(props) {
  const { data = [] } = props;

  console.log('data', data);


  const config = {
    data,
    padding: 'auto',
    xField: 'date',
    yField: 'amount',
    // xAxis: {
    //   tickCount: 1,
    // },
    slider: {
      start: 0.2,
      end: 1,
    },
  };

  return <Line {...config} />;
}
