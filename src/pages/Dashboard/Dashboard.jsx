import React, { useState, useEffect } from 'react';
import Overview from '../../components/Overview';
import Stockview from '../../components/StockView';
import MeMap from '../../components/MeMap';
import Sorft from '../../components/Sorft';
import QuickNav from './components/QuickNav';
import SalesChart from './components/SalesChart';
import RevenueChart from './components/RevenueChart';
import ReserveChart from './components/ReserveChart';
import PaymentChart from './components/PaymentChart';
import data from './data';
import { getTimeStamp } from '../../utils';
import {
  getAssestList,
  getOrderList,
  getContactList,
  getMachineList,
  getGoodsList,
  getCategoryList,
} from '../../services';

export default function () {
  console.log(getTimeStamp());
  const [billList, setBillList] = useState([]);
  const [orderList, setOrderList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [goodsList, setGoodsList] = useState([]);
  const [machineList, setMachineList] = useState([]);

  // 获取账单列表
  const fetchBillList = async (filter = {}) => {
    const res = await getAssestList(filter);
    setBillList(res);
  };

  // 获取订单列表
  const fetchOrderList = async (filter = {}) => {
    const res = await getOrderList(filter);

    setOrderList(res);
  };

  // 获取类目列表
  const fetchCategoryList = async (filter = {}) => {
    const res = await getCategoryList(filter);

    setCategoryList(res);
  };

  // 获取商品列表
  const fetchGoodsList = async (filter = {}) => {
    const res = await getGoodsList(filter);

    setGoodsList(res);
  };

  // 获取机器列表
  const fetchMachineList = async (filter = {}) => {
    const res = await getMachineList(filter);
    console.log('res', res);
    setMachineList(res);
  };

  useEffect(() => {
    fetchBillList();
    fetchOrderList();
    fetchCategoryList();
    fetchGoodsList();
    fetchMachineList();
  }, []);

  return (
    <div>
      {/* 快捷导航 */}
      <QuickNav />
      <SalesChart orderList={orderList} billList={billList} goodsList={goodsList} />
      {/* 资产相关 */}
      <RevenueChart billList={billList} />
      {/* 类目相关 */}
      <ReserveChart categoryList={categoryList} goodsList={goodsList} />
      {/* 机器map相关 */}
      <MeMap title="投放总览" data={machineList} />
      {/* 库存相关 */}
      <Stockview title="库存监控" data={goodsList} />
      {/* 订单相关 */}
      <Overview title="订单数据分析" data={orderList} />
      {/* 排行相关 */}
      <Sorft title="排行榜" goodsList={goodsList} categoryList={categoryList} />
    </div>
  );
}
