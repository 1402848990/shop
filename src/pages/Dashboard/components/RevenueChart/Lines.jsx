import React, { useState, useEffect } from 'react';
import { Line } from '@ant-design/charts';
import moment from 'moment';
import { groupBy } from 'lodash';

export default function Lines(props) {
  const { billList = [] } = props;
  const billListDay = groupBy(billList.map((i) => { return { ...i, day: moment(+i.createdAt).format('YYYY-MM-DD') }; }), 'day');
  console.log('billListDay', billListDay);
  const [data, setData] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch('https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json')
      .then(response => response.json())
      .then(json => setData(json))
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };
  const config = {
    data,
    padding: 'auto',
    xField: 'Date',
    yField: 'scales',
    xAxis: {
      tickCount: 5,
    },
    slider: {
      start: 0.1,
      end: 0.5,
    },
  };

  return <Line {...config} />;
}
