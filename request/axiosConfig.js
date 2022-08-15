/**
 * axios 拦截封装
 */
import { message } from 'antd';
import qs from 'qs';
import Cookie from 'js-cookie';
import axios from 'axios';
import baseUrl from './baseUrl';

const service = axios.create({
  baseURL: baseUrl,
  timeout: 600000,
  withCredentials: true,
});

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    console.log('response', response);
    // 获取更新的token

    const { data, data: { code, success, msg, data: resData } = {} } = response;
    const token = data?.data?.token;

    if (code === 401) {
      window.location.href = '/#/user/login';
    }
    // 如果token存在则存在cookie中
    if (token) {
      console.log('token', token);
      Cookie.set('token', token, { expires: 1 });
    }

    if (!success) {
      message.error(msg);
      return Promise.reject(msg);
    }
    return data || success;
  },
  (error) => {
    if (error.response) {
      console.log('error', error);
      const { status } = error.response;
      // 如果401或405则到登录页
      if (status === 401) {
        window.location.href = '/#/user/login';
      }
    }
    return Promise.reject(error);
  }
);

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // console.log(config);
    // 在cookie中取出用户信息
    // const cookie = Cookie.get('userInfo');
    // config.headers['Set-Cookie'] = encodeURIComponent(cookie);
    const token = Cookie.get('token');
    config.headers.Authorization = token;
    // post请求使用JSON形式提交
    if (config.method === 'post') {
      // config.data = qs.stringify(config.data);
      config.headers['Content-Type'] = 'application/json';
    }
    return config;
  },
  (error) => {
    console.log('error', error);
    return Promise.reject(error);
  }
);

export default service;
