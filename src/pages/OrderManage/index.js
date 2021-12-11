/* eslint-disable no-unused-expressions */
import React, { useRef, useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Dialog } from '@alifd/next';
import { cloneDeep } from 'lodash';
import Table from './components/Table';
import PageHead from '../../components/PageHead';
import {
  deleteMachine,
  getOrderList,
  getMachineList,
  getCategoryList,
} from '../../services';
import './index.scss';

export default withRouter((props) => {
  const { machineId } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [machineList, setMachineList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);

  // 获取所有订单方法
  const fetchData = async (_filter = {}) => {
    setIsLoading(true);
    const filter = cloneDeep(_filter);
    console.log('filter', filter);
    if (machineId) {
      filter.filter ? null : filter.filter = {};
      filter.filter.machineId = machineId;
    }

    if (
      filter?.filter?.isDiscount === true ||
      filter?.filter?.isDiscount === false
    ) {
      filter.filter.isDiscount = +filter?.filter?.isDiscount;
    }
    if (filter?.filter?.timeRange) {
      filter.filter.timeRange = [
        filter?.filter?.timeRange[0].valueOf(),
        filter?.filter?.timeRange[1]?.valueOf(),
      ];
    }
    const res = await getOrderList(filter);
    setIsLoading(false);
    setData(res);
  };

  // 获取机器列表
  async function fetchMachineList() {
    const res = await getMachineList();
    setMachineList(res);
  }

  // 获取类目列表
  async function fetchCategoryList() {
    const res = await getCategoryList();
    setCategoryList(res);
  }

  useEffect(() => {
    fetchData();
    fetchMachineList();
    fetchCategoryList();
  }, []);

  // 删除订单方法
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
      <PageHead title="订单管理" />
      {/* 订单展示表格 */}
      <Table
        machineId={machineId}
        data={data}
        fetchData={fetchData}
        handleDelete={handleDelete}
        isLoading={isLoading}
        machineList={machineList}
        categoryList={categoryList}
      />
    </div>
  );
});
