import React from 'react';
import { Timeline } from 'antd';
import moment from 'moment';
import { Link } from 'react-router-dom';
import './index.scss';

const COLORLIST = [
  '#d93737', '#ee706d', '#ff9800', '#5e83fb', '#58ca9a',
];

export default function (props) {
  const { data, isCity } = props;
  console.log('data', data);
  return (
    <div>
      <Timeline
        mode="left"
        style={{ margin: '32px 0 22px 32px' }}
        classNama="local-time"
      >
        {data.map((item) => {
          const jumpUrl = isCity ? `/globalNoticeDetail/${item.id}/true` : `/globalNoticeDetail/${item.id}/false`;
          return (
            <Timeline.Item color={COLORLIST[item.level]}>
              <Link to={jumpUrl} >
                <div className="globalNoticeTime">{moment(item.createdAt).format('YYYY-MM-DD HH:mm')}</div>
                <div className="globalNoticeTitle">{item.title}</div>
              </Link>
            </Timeline.Item>
          );
        })}
      </Timeline>
    </div>
  );
}
