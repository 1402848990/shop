/* eslint-disable no-restricted-syntax */
import React from 'react';
import { Select } from 'antd';

/* eslint-disable import/prefer-default-export */
// 各个省份的代码和名称枚举值
export const PROVINCE = {
  110000: '北京',
  120000: '天津',
  130000: '河北省',
  140000: '山西省',
  150000: '内蒙古自治区',
  210000: '辽宁省',
  220000: '吉林省',
  230000: '黑龙江省',
  310000: '上海',
  320000: '江苏省',
  330000: '浙江省',
  340000: '安徽省',
  350000: '福建省',
  360000: '江西省',
  370000: '山东省',
  410000: '河南省',
  420000: '湖北省',
  430000: '湖南省',
  440000: '广东省',
  450000: '广西壮族自治区',
  460000: '海南省',
  500000: '重庆',
  510000: '四川省',
  520000: '贵州省',
  530000: '云南省',
  540000: '西藏自治区',
  610000: '陕西省',
  620000: '甘肃省',
  630000: '青海省',
  640000: '宁夏回族自治区',
  650000: '新疆维吾尔自治区',
  710000: '台湾省',
  810000: '香港特别行政区',
  820000: '澳门特别行政区',
  990000: '海外',
};

// 生成省份的选项
export const PROVICEOPT = () => {
  const res = [];
  for (const [value, label] of Object.entries(PROVINCE)) {
    res.push({ label, value });
  }
  return res;
};


// 获取本月初、本周、本日时间戳
export function getTimeStamp() {
  const res = {
    yesterday: {},
    month: {},
    lastMonth: {}, // 本月的时间跨度，从本月1号到昨天的日期
  };
  const now = new Date();

  res.yesterday.start =
    new Date(
      `${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()}`
    ).getTime() /
      1000 -
    24 * 3600;
  res.yesterday.end =
    new Date(
      `${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()}`
    ).getTime();

  res.lastMonth.end =
    new Date(
      `${now.getFullYear()}/${now.getMonth() + 1}/${1}`
    ).getTime() /
      1000 -
    1;
  const lastMonthD = new Date(res.lastMonth.end * 1000);
  res.lastMonth.start =
    new Date(
      `${lastMonthD.getFullYear()}/${lastMonthD.getMonth() + 1}/${1}`
    ).getTime() / 1000;

  res.month.start =
    new Date(
      `${now.getFullYear()}/${now.getMonth() + 1}/${1}`
    ).getTime();
  res.month.end = res.yesterday.end;

  return res;
}
