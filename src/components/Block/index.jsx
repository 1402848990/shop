import React from 'react';
import './index.scss';

export default function Block({ columns = [] }) {
  return columns.map(item => (
    <div className="block" style={{ background: item.bgColor }}>
      <div className="add">
        {item.addNum !== undefined ? (
          <div>
            {' '}
            较上日
            <span className="addNum" style={{ color: item.numberColor }}>
              +{item.addNum}
            </span>
          </div>
        ) : null}
      </div>
      <div className="number" style={{ color: item.numberColor }}>
        {item.number}
      </div>
      <div className="text">
        <span>{item.label}</span>
      </div>
    </div>
  ));
}
