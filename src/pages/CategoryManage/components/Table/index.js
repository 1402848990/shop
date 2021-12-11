import React from 'react';
import { Button } from '@alifd/next';
import moment from 'moment';
import IceContainer from '@icedesign/container';
import Filter from '../Filter';
import BaseTable from '../../../../common/BaseTable';

export default function (props) {
  const { data, isLoading, handleDelete } = props;


  const handleFilterChange = () => {
    // fetchData(5);
  };


  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '类目名称',
      dataIndex: 'categoryName',
      key: 'categoryName',
    },
    {
      title: '添加时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: text => moment(+text).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '操作',
      dataIndex: 'button',
      key: 'button',
      render: (_, { id }) => (
        <Button key={id} type="normal" warning onClick={() => handleDelete(id)}>
          删除
        </Button>
      ),
    },
  ];

  return (
    <div style={styles.container}>
      {/* <IceContainer>
        <Filter onChange={handleFilterChange} />
      </IceContainer> */}
      <IceContainer>
        <BaseTable loading={isLoading} columns={columns} dataSource={data} />
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
