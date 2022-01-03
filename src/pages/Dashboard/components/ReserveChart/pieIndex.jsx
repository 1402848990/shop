import React, { useState, useEffect } from 'react';
import { Pie } from '@ant-design/charts';

export default function DemoPie({ data }) {
  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'name',
    radius: 0.75,
    label: {
      type: 'spider',
      labelHeight: 28,
      content: '{name}\n{percentage}',
    },
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
    ],
  };
  return <Pie {...config} />;
}
