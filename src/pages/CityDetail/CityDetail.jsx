// 城市疫情
import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import BaseCol from '../../components/BaseCol';
import PageHead from '../../components/PageHead';
import AssetTab from './components/AssetTab';
import IceContainer from '@icedesign/container';
import DateLines from '../../components/DateLines';
import { siteCityNoticeList } from '../../services';

export default withRouter((props) => {
  const { cityObj = '' } = props.match.params || {};
  const cityDetail = JSON.parse(cityObj);
  const [niticeList, setNoticelist] = useState([]);

  const totalData = [
    {
      title: '现有确诊人数',
      value: cityDetail.curConfirm,
      color: '#ff6a57',
    },
    {
      title: '累计确诊人数',
      value: cityDetail.confirm,
      color: '#ff6a57',
    },
    {
      title: '无症状感染者人数',
      value: cityDetail.asymptomatic,
      color: '#e86d48',
    },
    {
      title: '境外输入人数',
      value: cityDetail.overseasInputRelative,
      color: '#e83132',
    },
    {
      title: '累计治愈人数',
      value: cityDetail.heal,
      color: '#10aeb5',
    },
    {
      title: '累计死亡人数',
      value: cityDetail.died,
      color: '#4d5054',
    },

  ];

  // 获取播报列表
  const getSiteCityNoticeList = async () => {
    const res = await siteCityNoticeList(cityDetail.xArea);
    setNoticelist(res);
  };

  useEffect(() => {
    getSiteCityNoticeList();
  }, []);

  return (
    <div>
      <PageHead title={<span style={{ color: 'white', fontSize: '22px' }}>{cityDetail.xArea}疫情主页</span>} />
      <BaseCol data={totalData} col="3" />
      {/* <IceContainer title="趋势图">
        <DateLines data={sevenData} />
      </IceContainer> */}
      <AssetTab niticeList={niticeList} list={cityDetail.subList} />
    </div>
  );
});
