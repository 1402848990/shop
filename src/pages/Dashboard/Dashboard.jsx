// 大数据分析页面

import React, { useState, useEffect } from 'react';
import { Tabs, Alert } from 'antd';
import Block from '../../components/Block';
import QuickNav from './components/QuickNav';
import CovMap from '../../components/CovMap';
import Marquee from 'react-fast-marquee';
import { Tab } from '@alifd/next';
import DateLines from '../../components/DateLines';
import DataColumns from '../../components/DataColumns';
import CityList from '../../components/CityList';
import GlobalTimeLine from '../../components/GlobalTimeLine';
import IceContainer from '@icedesign/container';
import moment from 'moment';
import {
  allCityData,
  getGlobalViewData,
  getSevenData,
  getSiteMessage,
  getSiteGlobalNoticeList,
} from '../../services';
import './index.scss';

const { TabPane } = Tabs;

export default function () {
  const [tab, setTab] = useState('TAB_1');
  const [mapKey, setMapKey] = useState('confirm');
  const [globalViewData, setGlobalViewData] = useState({});
  const [sevenData, setSevenData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [siteMessage, setSiteMessage] = useState({});
  const [globalNotice, setGlobalNotice] = useState([]);
  const { news, desc = {}, riskarea } = globalViewData;

  // 获取现存、新增等疫情数据
  const fetchGlobalViewData = async () => {
    const res = await getGlobalViewData();
    setGlobalViewData(res);
  };

  // 获取近7天数据
  const fetchSevenData = async () => {
    const res = await getSevenData();
    setSevenData(res);
  };

  // 获取站点通报
  const fetchSiteMessage = async () => {
    const res = await getSiteMessage();
    setSiteMessage(res);
  };

  // 获取站点全国播报
  const fetchSiteGlobalNoticeList = async () => {
    const res = await getSiteGlobalNoticeList();
    setGlobalNotice(res);
  };

  // 获取各省疫情数据
  const fetchCityData = async () => {
    const res = await allCityData();
    setCityData(res);
  };

  useEffect(() => {
    fetchGlobalViewData();
    fetchCityData();
    fetchSevenData();
    fetchSiteMessage();
    fetchSiteGlobalNoticeList();
  }, []);

  // 切换tab
  const tabChange = (val) => {
    setTab(val);
  };

  const blockCol = [
    {
      label: '现存确诊',
      addNum: desc.currentConfirmedIncr,
      number: desc.currentConfirmedCount,
      numberColor: '#e57631',
      bgColor: '#f9f3ef',
    },
    {
      label: '累计确诊',
      addNum: desc.confirmedIncr,
      number: desc.confirmedCount,
      numberColor: '#e61c1d',
      bgColor: '#fff8f8',
    },
    {
      label: '现有无症状',
      addNum: desc.seriousIncr,
      number: desc.seriousCount,
      numberColor: '#be2121',
      bgColor: '#f7f1f1',
    },
    {
      label: '累计境外输入',
      addNum: desc.suspectedIncr,
      number: desc.suspectedCount,
      numberColor: '#ae3ac6',
      bgColor: '#f4eaf5',
    },
    {
      label: '累计治愈',
      addNum: desc.curedIncr,
      number: desc.curedCount,
      numberColor: '#3491e7',
      bgColor: '#a9d7c3',
    },
    {
      label: '累计死亡',
      addNum: desc.deadIncr,
      number: desc.deadCount,
      numberColor: '#4e5a65',
      bgColor: '#ebeef1',
    },
    {
      label: '现有中风险地区',
      number: riskarea?.mid?.length,
      numberColor: '#4e5a65',
      bgColor: '#ebeef1',
    },
    {
      label: '现有高风险地区',
      number: riskarea?.high?.length,
      numberColor: '#4e5a65',
      bgColor: '#ebeef1',
    },
  ];

  const renderAddColor = (num) => {
    if (num === 0) {
      return 'white';
    } else if (num < 500) {
      return '#ff9985';
    } else if (num < 2000) {
      return '#f57567';
    } else if (num < 4000) {
      return '#ef5948';
    } else if (num < 6000) {
      return '#b80808';
    } else if (num < 10000) {
      return '#d10606';
    }
    return '#620202';
  };

  const renderCurrColor = (num) => {
    if (num === 0) {
      return 'white';
    } else if (num < 20) {
      return '#ff9985';
    } else if (num < 50) {
      return '#f57567';
    } else if (num < 150) {
      return '#ef5948';
    } else if (num < 150) {
      return '#b80808';
    }
    return '#620202';
  };

  const renderDelColor = (num) => {
    if (num === 0) {
      return 'white';
    } else if (num < 20) {
      return '#9f9a9a';
    } else if (num < 50) {
      return '#565454';
    } else if (num < 100) {
      return '#302b2b';
    }
    return '#0e0d0d';
  };

  console.log('sevenData', sevenData);

  return (
    <div className="index">
      <Alert
        className="notice"
        banner
        message={
          <Marquee pauseOnHover gradient={false}>
            {siteMessage.content || ''}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {moment(siteMessage.createdAt).format('YYYY-MM-DD HH:mm') || ''}
          </Marquee>
        }
      />
      <Tabs
        activeKey={tab}
        centered
        animated={{ inkBar: true, tabPane: true }}
        defaultActiveKey="TAB_1"
        onChange={tabChange}
      >
        <TabPane tab="国内疫情" key="TAB_1">
          <IceContainer title="国内疫情数据总览">
            <div className="desc-note">
              数据更新至 {moment(desc.modifyTime).format('YYYY-MM-DD HH:mm:ss')}
            </div>
            <Block columns={blockCol} />
          </IceContainer>
          <IceContainer title="国内疫情数据总览">
            <Tab
              animated
              size="small"
              shape="capsule"
              activeKey={mapKey}
              onChange={val => setMapKey(val)}
            >
              <Tab.Item key="curConfirm" title="全国当前确诊地图">
                <CovMap
                  mapKey={mapKey}
                  renderColor={renderCurrColor}
                  cityData={cityData}
                />
              </Tab.Item>
              <Tab.Item key="confirm" title="全国累计确诊地图">
                <CovMap
                  mapKey={mapKey}
                  renderColor={renderAddColor}
                  cityData={cityData}
                />
              </Tab.Item>
              <Tab.Item key="died" title="全国累计死亡地图">
                <CovMap
                  mapKey={mapKey}
                  renderColor={renderDelColor}
                  cityData={cityData}
                />
              </Tab.Item>
            </Tab>
          </IceContainer>
          <IceContainer title="趋势图">
            <DateLines data={sevenData} />
          </IceContainer>
          <IceContainer title="柱形图">
            <DataColumns data={sevenData} />
          </IceContainer>
          <IceContainer title="各省份详细数据">
            <CityList data={cityData} />
          </IceContainer>
        </TabPane>
        <TabPane tab="全国播报" key="TAB_2">
          <IceContainer title="全国播报">
            <GlobalTimeLine data={globalNotice} />
          </IceContainer>
        </TabPane>
        {/* <TabPane tab="全国播报" key="TAB_3">
          Content of Tab Pane 3
        </TabPane>
        <TabPane tab="官方辟谣" key="TAB_4">
          Content of Tab Pane 4
        </TabPane> */}
      </Tabs>
      {/* 快捷导航 */}
      <QuickNav />
    </div>
  );
}
