import React from 'react';
import { Tag, notification } from 'antd';
import { withRouter } from 'react-router-dom';
import { Button } from '@alifd/next';
import moment from 'moment';
import IceContainer from '@icedesign/container';
import Filter from '../Filter';
import BaseTable from '../../../../common/BaseTable';
import { updateMachine } from '../../../../services';

export default withRouter((props) => {
  const { data, isLoading, fetchData, machineList, categoryList, machineId } = props;

  const columns = [
    {
      title: '订单编号',
      width: 140,
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '时间',
      width: 180,
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: text => moment(+text).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '商品名称',
      width: 180,
      dataIndex: 'goodName',
    },
    {
      title: '是否促销',
      width: 120,
      dataIndex: 'isDiscount',
      render: val =>
        (val ? <Tag color="#87d068">是</Tag> : <Tag color="#ff0000">否</Tag>),
    },
    {
      title: '售价',
      width: 150,
      dataIndex: 'price',
      render: (val, record) => (record.isDiscount ? record.salePrice : val),
    },
    {
      title: '成本价',
      width: 150,
      dataIndex: 'rootPrice',
    },
    {
      title: '数量',
      width: 150,
      dataIndex: 'goodsNum',
    },
    {
      title: '总金额',
      width: 150,
      dataIndex: 'amount',
    },
    {
      title: '总利润',
      width: 150,
      dataIndex: 'profit',
    },
    {
      title: '所属机器',
      width: 160,
      dataIndex: 'machineName',
      key: 'machineName',
    },
    {
      title: '所属机器ID',
      width: 160,
      dataIndex: 'machineId',
      key: 'machineId',
    },
    {
      title: '类目ID',
      width: 150,
      dataIndex: 'categoryId',
    },
    {
      title: '类目',
      width: 150,
      dataIndex: 'categoryName',
    },
    {
      title: '区域',
      width: 90,
      dataIndex: 'local',
      key: 'local',
    },
    {
      title: '支付方式',
      width: 150,
      dataIndex: 'payWay',
      render: val => (val ? '微信' : '支付宝'),
    },
    {
      title: '过期时间',
      dataIndex: 'expiresAt',
      render: text => moment(+text).format('YYYY-MM-DD HH:mm:ss'),
    },
  ];

  return (
    <div style={styles.container}>
      <IceContainer>
        <Filter
          onChange={fetchData}
          machineList={machineList}
          machineId={machineId}
          categoryList={categoryList}
        />
      </IceContainer>
      <IceContainer>
        <BaseTable
          loading={isLoading}
          columns={columns}
          dataSource={data}
          scrollX={2500}
        />
      </IceContainer>
    </div>
  );
});

const styles = {
  pagination: {
    marginTop: '20px',
    textAlign: 'right',
  },
};
