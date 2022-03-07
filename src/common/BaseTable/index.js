// 基础表格

import React from 'react';
import { Table } from 'antd';

export default function (props) {
  const { dataSource, loading, rowSelection = false, columns = [], scrollX } = props;
  const pagination = {
    showQuickJumper: true,
    showSizeChanger: true,
    showTotal: (total, range) => <p style={{ fontSize: '15px', color: '#40a9ff', lineHeight: '30px', marginRight: '200px' }}>{`总计：${total} 条数据，当前：${range[0]} ~ ${range[1]}`}</p>,
  };

  return (
    <Table
      rowKey={record => record.id}
      rowSelection={rowSelection}
      columns={columns}
      dataSource={dataSource}
      bordered
      scroll={{ x: scrollX }}
      className="formTable"
      loading={loading}
      pagination={pagination}
    />
  );
}
