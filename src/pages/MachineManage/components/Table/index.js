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
  const { data, isLoading, handleDelete, fetchData } = props;

  // 启动/停止机器
  const handleStopOrStart = async (id, status, name) => {
    await updateMachine({ id, status });
    notification.success({ message: `机器/门店 ${name} ${status ? '启动' : '停止'} 成功！` });
    fetchData();
  };

  const columns = [
    {
      title: '编号',
      width: 100,
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '名字',
      // width: 160,
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '机器/门店状态',
      width: 120,
      dataIndex: 'status',
      key: 'status',
      render: val =>
        (val ? (
          <Tag color="#87d068">运行中</Tag>
        ) : (
          <Tag color="#ff0000">停止</Tag>
        )),
    },
    {
      title: '区域',
      width: 90,
      dataIndex: 'local',
      key: 'local',
    },
    {
      title: '橱窗数（个）',
      width: 110,
      dataIndex: 'cellNum',
      key: 'cellNum',
    },
    {
      title: '在售商品种类',
      width: 120,
      dataIndex: 'goodsNum',
      key: 'goodsNum',
      render: (_, item) => item.goodIds?.split(',').length,
    },
    {
      title: '负责人名字',
      width: 120,
      dataIndex: 'personName',
      key: 'personName',
    },
    {
      title: '年度目标',
      width: 100,
      dataIndex: 'target',
      key: 'target',
    },
    {
      title: '创建时间',
      width: 180,
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: text => moment(+text).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '配置更新时间',
      width: 180,
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: text => moment(+text).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '操作',
      width: 300,
      dataIndex: 'button',
      key: 'button',
      fixed: 'right',
      render: (_, { id, name }) => (
        <div>
          <Button
            key={`${id}edit`}
            type="primary"
            onClick={() => props.history.push(`/add/machine/${id}`)}
          >
            配置
          </Button>&nbsp;&nbsp;
          <Button
            key={`${id}stop`}
            type="primary"
            style={{ background: '#5f5956' }}
            onClick={() => handleStopOrStart(id, 0, name)}
          >
            停止
          </Button>&nbsp;&nbsp;
          <Button
            key={`${id}start`}
            type="primary"
            style={{ background: '#87d068' }}
            onClick={() => handleStopOrStart(id, 1, name)}
          >
            启动
          </Button>&nbsp;&nbsp;
          <Button
            key={`${id}del`}
            type="primary"
            warning
            onClick={() => handleDelete(id)}
          >
            删除
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div style={styles.container}>
      <IceContainer>
        <Filter onChange={fetchData} />
      </IceContainer>
      <IceContainer>
        <BaseTable loading={isLoading} columns={columns} dataSource={data} scrollX={1600} />
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
