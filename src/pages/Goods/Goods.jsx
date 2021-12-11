import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import Table from './components/Table';
import GoodsTable from './components/GoodsTable';
import PageHead from '../../components/PageHead';
import { getGoodsList } from '../../services';


export default withRouter((props) => {
  const [goodsList, setGoodsList] = useState([]);

  // 获取商品列表
  const fetchGoodsList = async (filter) => {
    const res = await getGoodsList(filter);
    console.log('res', res);
    setGoodsList(res);
  };

  useEffect(() => {
    fetchGoodsList();
  }, []);

  const handleClick = () => {
    props.history.push('add/goods');
  };

  return (
    <div>
      <PageHead
        title="商品管理"
        buttonText="添加商品"
        onClick={handleClick}
      />
      <GoodsTable goodsList={goodsList} fetchGoodsList={fetchGoodsList} />
    </div>
  );
});
