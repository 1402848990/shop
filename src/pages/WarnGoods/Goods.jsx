// 预警页面

import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import GoodsTable from './components/GoodsTable';
import PageHead from '../../components/PageHead';
import { getGoodsList } from '../../services';

export default withRouter((props) => {
  const [goodsList, setGoodsList] = useState([]);
  const [stockWarnGoodsList, setStockWarnGoodsList] = useState([]);
  const [expiresWarnGoodsList, setExpiresWarnGoodsList] = useState([]);

  // 获取商品列表
  const fetchGoodsList = async (filter) => {
    const res = await getGoodsList(filter);
    setGoodsList(res);
    setStockWarnGoodsList(res.filter(i => i.stockWarn));
    setExpiresWarnGoodsList(res.filter(i => i.expiresWarn));
  };

  useEffect(() => {
    fetchGoodsList();
  }, []);

  return (
    <div>
      <PageHead
        title="预警商品"
      />
      <GoodsTable
        goodsList={goodsList}
        stockWarnGoodsList={stockWarnGoodsList}
        expiresWarnGoodsList={expiresWarnGoodsList}
        fetchGoodsList={fetchGoodsList}
      />
    </div>
  );
});
