import React from 'react';
import { Button } from 'antd';
import moment from 'moment';
import IceContainer from '@icedesign/container';
import Filter from '../Filter';
import BaseTable from '../../../../common/BaseTable';

export default function (props) {
  const { data, isLoading, handleDelete, handleEdit } = props;

  const handleFilterChange = () => {
    // fetchData(5);
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 120,
    },
    {
      title: '平台名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '平台LOGO',
      dataIndex: 'logo',
      key: 'logo',
      width: 150,
      render: (val) => {
        return <img width="60px" src={val} />;
      },
    },
    {
      title: '权重',
      dataIndex: 'sortWeight',
      key: 'sortWeight',
      width: 120,
    },
    {
      title: '添加时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 170,
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
      width: 170,
    },
    {
      title: '操作',
      dataIndex: 'button',
      key: 'button',
      width: 300,
      render: (_, item) => (
        <div>
          <Button
            key={`${item?.id}-edit`}
            style={{ marginRight: '16px' }}
            type="primary"
            onClick={() => handleEdit(item)}
          >
            修改
          </Button>
          <Button
            key={item?.id}
            type="default"
            danger
            onClick={() => handleDelete(item?.id)}
          >
            删除
          </Button>

        </div>
      ),
    },
  ];

  return (
    <div style={styles.container}>
      {/* <IceContainer>
        <Filter onChange={handleFilterChange} />
      </IceContainer> */}
      <IceContainer>
        <BaseTable loading={isLoading} columns={columns} dataSource={data} scrollX={1300} />
      </IceContainer>
    </div>
  );
}

const styles = {
  pagination: {
    marginTop: '20px',
    textAlign: 'right',
  },
};
