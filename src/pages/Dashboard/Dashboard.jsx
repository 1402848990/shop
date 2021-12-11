import React, { useState, useEffect } from 'react';
import Overview from '../../components/Overview';
import QuickNav from './components/QuickNav';
import SalesChart from './components/SalesChart';
import RevenueChart from './components/RevenueChart';
import ReserveChart from './components/ReserveChart';
import PaymentChart from './components/PaymentChart';
import data from './data';
import { getTimeStamp } from '../../utils';
import { getAssestList, getOrderList, getContactList, getMachineList, getGoodsList, getCategoryList } from '../../services';

export default function () {
  console.log(getTimeStamp());
  const [billList, setBillList] = useState([]);

  // 获取账单列表
  const fetchBillList = async (filter = {}) => {
    const res = await getAssestList(filter);
    setBillList(res);
  };

  useEffect(() => {
    fetchBillList();
  }, []);

  return (
    <div>
      <QuickNav />
      <SalesChart />
      <RevenueChart billList={billList} />
      <Overview data={data.data0} />
      <Overview data={data.data1} />
      <ReserveChart />
      <PaymentChart />
      <Overview data={data.data2} />
      <Overview data={data.data3} col={2} />
      <Overview title="汇总数据" data={data.data4} />
    </div>
  );
}
