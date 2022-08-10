// 我的账户页面
import React, { useState, useEffect } from 'react';
import AssestView from '../../components/AssestView';
import PageHead from '../../components/PageHead';
import AssetTab from './components/AssetTab';
import { getAssestList } from '../../services';

export default function Index() {
  const [billList, setBillList] = useState([]);

  const totalData = [
    {
      title: '全部总入账(元)',
      value: billList.reduce((pre, curr) => +pre + +curr.amount, 0),
    },
    {
      title: '支付宝总入账(元)',
      value: billList.filter(i => !i.payWay).reduce((pre, curr) => +pre + +curr.amount, 0),
    },
    {
      title: '微信总入账(元)',
      value: billList.filter(i => i.payWay).reduce((pre, curr) => +pre + +curr.amount, 0),
    },
  ];

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
      <PageHead title="资产管理" />
      <AssestView data={totalData} col="3" />
      <AssetTab billList={billList} />
    </div>
  );
}

