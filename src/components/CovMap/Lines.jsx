import React, { useState, useEffect } from 'react';
import { AreaMap } from '@ant-design/charts';

export default function DemoAreaMap(props) {
  const [data, setData] = useState({ type: 'FeatureCollection', features: [] });

  const { cityMap = {}, renderColor, mapKey } = props;

  console.log('props', props);

  useEffect(() => {
    asyncFetch();
  }, [cityMap]);

  const asyncFetch = () => {
    fetch(
      'https://gw.alipayobjects.com/os/bmw-prod/d6da7ac1-8b4f-4a55-93ea-e81aa08f0cf3.json'
    )
      .then(response => response.json())
      .then((json) => {
        // console.log('json', json, 'group', group);
        json.features.forEach((item) => {
          const key = `${item?.properties?.name}`.slice(0, 2);
          // console.log('key', key, cityMap[key]);
          // console.log('key', key, group[+key]);
          const num = (cityMap[key] && cityMap[key][0][mapKey]) || 0;
          item.properties.num = num;
        });
        setData(json);
      })
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };
  // console.log('---data', data);
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
      // value: ['#ffe5db', '#ff9985', '#f57567', '#ef5948', '#b80808', '#d10606', '#620202'],
      // value: ['rgb(239,243,255)', 'rgb(189,215,231)', 'rgb(107,174,214)', 'rgb(107,174,214)'],
      value: ({ num }) => renderColor(num),
      // scale: { type: 'quantile' },
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

  // console.log('data', data);

  return (
    <div style={{ height: '550px' }}>
      <AreaMap {...config} />
    </div>
  );
}
