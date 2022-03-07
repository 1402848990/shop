import React, { useState, useEffect } from 'react';
import { AreaMap } from '@ant-design/charts';

export default function DemoAreaMap(props) {
  const [data, setData] = useState({ type: 'FeatureCollection', features: [] });

  const { group } = props;

  console.log('props', props);

  useEffect(() => {
    asyncFetch();
  }, [group]);

  const asyncFetch = () => {
    fetch(
      'https://gw.alipayobjects.com/os/bmw-prod/d6da7ac1-8b4f-4a55-93ea-e81aa08f0cf3.json'
    )
      .then(response => response.json())
      .then((json) => {
        console.log('json', json, 'group', group);
        json.features.forEach((item) => {
          const key = `${item?.properties?.adcode}`;
          // console.log('key', key, group[+key]);
          item.properties.num = group[key]?.length || 0;
          // item.properties.num = Math.floor(Math.random() * 100) || 0;
        });
        setData(json);
      })
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };
  const config = {
    map: {
      type: 'mapbox',
      style: 'blank',
      center: [120.19382669582967, 30.258134],
      zoom: 3,
      pitch: 0,
    },
    source: {
      data,
      parser: {
        type: 'geojson',
      },
    },
    autoFit: true,
    color: {
      field: 'num',
      value: ['#fee5d9', '#fb6a4a', '#de2d26', '#a50f15'],
      // value: ({ num }) => {
      //   if (num === 0) {
      //     return 'rgb(239,243,255)';
      //   } else if (num < 4) {
      //     return 'rgb(49,130,189)';
      //   } else if (num < 8) {
      //     return 'rgb(8,81,156)';
      //   }
      //   return '#de2d26';
      // },
      scale: { type: 'quantize' },
    },
    style: {
      opacity: 1,
      stroke: 'rgb(93,112,146)',
      lineWidth: 0.6,
      lineOpacity: 1,
    },
    state: {
      active: true,
    },
    label: {
      visible: true,
      field: 'name',
      style: {
        fill: '#000',
        opacity: 0.8,
        fontSize: 10,
        stroke: '#fff',
        strokeWidth: 1.5,
        textAllowOverlap: false,
        padding: [5, 5],
      },
    },
    tooltip: {
      items: ['name', 'num'],
    },
    zoom: {
      position: 'bottomright',
    },
    legend: {
      position: 'bottomleft',
    },
  };

  console.log('data', data);

  return (
    <div style={{ height: '500px' }}>
      <AreaMap {...config} />
    </div>
  );
}
