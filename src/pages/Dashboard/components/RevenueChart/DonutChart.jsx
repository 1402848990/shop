import React, { Component } from 'react';
import { Chart, Geom, Axis, Tooltip, Coord, Legend, Guide } from 'bizcharts';
import DataSet from '@antv/data-set';

export default class DonutChart extends Component {
  render() {
    const { wxValue, zfbValue } = this.props;
    const allValue = wxValue + zfbValue;
    const { DataView } = DataSet;
    const { Html } = Guide;

    console.log(((zfbValue / allValue) * 100));

    // MOCK 数据，实际业务按需进行替换
    const data = [
      {
        item: '支付宝收入',
        count: +((zfbValue / allValue) * 100).toFixed(2),
      },
      {
        item: '微信收入',
        count: +((wxValue / allValue) * 100).toFixed(2),
      },
    ];
    const dv = new DataView();
    dv.source(data).transform({
      type: 'percent',
      field: 'count',
      dimension: 'item',
      as: 'percent',
    });
    const cols = {
      percent: {
        formatter: (val) => {
          val = `${val * 100}%`;
          return val;
        },
      },
    };
    return (
      <Chart height={240} data={dv} scale={cols} padding={[10]} forceFit>
        <Coord type="theta" radius={0.8} innerRadius={0.7} />
        <Axis name="percent" />
        <Legend position="bottom" />
        <Tooltip
          showTitle={false}
          itemTpl='<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
        />
        <Guide>
          <Html
            position={['50%', '50%']}
            html={`<div style="color:#8c8c8c;font-size:14px;text-align: center;width: 10em;">总收入(元)<br><span style="color:#262626;font-size:24px">${allValue.toFixed(2)}</span></div>`}
            alignX="middle"
            alignY="middle"
          />
        </Guide>
        <Geom
          type="intervalStack"
          position="percent"
          color="item"
          tooltip={[
            'item*percent',
            (item, percent) => {
              percent = `${percent * 100}%`;
              return {
                name: item,
                value: percent,
              };
            },
          ]}
          style={{
            lineWidth: 1,
            stroke: '#fff',
          }}
        />
      </Chart>
    );
  }
}
