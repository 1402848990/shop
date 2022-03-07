// 机器管理页面

/* eslint-disable no-unused-expressions */
import React, { useRef, useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Dialog } from '@alifd/next';
import { cloneDeep } from 'lodash';
import Table from './components/Table';
import PageHead from '../../components/PageHead';
import { deleteMachine, getMachineList } from '../../services';
import './index.scss';

export default withRouter((props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  // 获取所有机器方法
  const fetchData = async (_filter = {}) => {
    setIsLoading(true);
    const filter = cloneDeep(_filter);
    console.log('filter', filter);
    if (filter?.filter?.status) {
      filter.filter.status = +filter?.filter?.status;
    }
    if (filter?.filter?.target) {
      filter.filter.target = [+filter?.filter?.target[0] * 10000, +filter?.filter?.target[1] * 10000];
    }

    const res = await getMachineList(filter);
    setIsLoading(false);
    setData(res);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleClick = () => {
    props.history.push('add/machine');
  };

  // 删除机器方法
  const handleDelete = (id) => {
    Dialog.confirm({
      title: '提示',
      content: '确认删除吗',
      onOk: async () => {
        await deleteMachine(id);
        fetchData();
      },
    });
  };

  return (
    <div>
      <PageHead title="机器管理" buttonText="新增机器" onClick={handleClick} />
      {/* 机器展示表格 */}
      <Table
        data={data}
        fetchData={fetchData}
        handleDelete={handleDelete}
        isLoading={isLoading}
      />
    </div>
  );
});
