/**
 * 请求接口集合
 */

/* eslint-disable import/prefer-default-export */
import axios from '../request/axiosConfig';

/**
 * @description 类目相关
 */

// 新增类目
export const addCategory = async (categoryName) => {
  const res = await axios({
    url: '/Category/add',
    method: 'post',
    data: categoryName,
  });
  return res;
};

// 获取类目列表
export const getCategoryList = async () => {
  const res = await axios({
    url: '/Category/getAll',
    method: 'post',
  });
  return res.data;
};

// 删除类目
export const deleteCategory = async (id) => {
  const res = await axios({
    url: '/Category/delete',
    method: 'post',
    data: { id },
  });
  return res;
};

/**
 * @description 商品相关
 */

// 获取商品列表
export const getGoodsList = async (data) => {
  const res = await axios({
    url: '/Goods/getAll',
    method: 'post',
    data,
  });
  return res.data;
};

// 新增商品
export const addGood = async (data) => {
  const res = await axios({
    url: '/Goods/add',
    method: 'post',
    data,
  });
  return res;
};

// 编辑商品
export const updateGood = async (data) => {
  const res = await axios({
    url: '/Goods/update',
    method: 'post',
    data,
  });
  return res;
};


// 删除商品
export const deleteGood = async (id) => {
  const res = await axios({
    url: '/Goods/delete',
    method: 'post',
    data: { id },
  });
  return res;
};

// 获取商品详情
export const getGoodDetail = async (id) => {
  const res = await axios({
    url: '/Goods/detail',
    method: 'post',
    data: { id },
  });
  return res.data;
};

/**
 * @description 机器相关
 */

// 获取机器列表
export const getMachineList = async (data) => {
  const res = await axios({
    url: '/Machine/getAll',
    method: 'post',
    data,
  });
  return res.data;
};

// 新增机器
export const addMachine = async (data) => {
  const res = await axios({
    url: '/Machine/add',
    method: 'post',
    data,
  });
  return res;
};

// 编辑机器
export const updateMachine = async (data) => {
  const res = await axios({
    url: '/Machine/update',
    method: 'post',
    data,
  });
  return res;
};


// 删除机器
export const deleteMachine = async (id) => {
  const res = await axios({
    url: '/Machine/delete',
    method: 'post',
    data: { id },
  });
  return res;
};

// 获取机器详情
export const getMachineDetail = async (id) => {
  const res = await axios({
    url: '/Machine/detail',
    method: 'post',
    data: { id },
  });
  return res.data;
};


/**
 * @description 联系人相关
 */

// 获取联系人列表
export const getContactList = async (data) => {
  const res = await axios({
    url: '/Contact/contactList',
    method: 'post',
    data,
  });
  return res.data;
};

/**
 * @description 机器相关
 */

// 获取订单列表
export const getOrderList = async (data) => {
  const res = await axios({
    url: '/Order/getAll',
    method: 'post',
    data,
  });
  return res.data;
};

// 新增机器
export const addOrder = async (data) => {
  const res = await axios({
    url: '/Order/add',
    method: 'post',
    data,
  });
  return res;
};

// 获取资产列表
export const getAssestList = async (data) => {
  const res = await axios({
    url: '/Assest/getAll',
    method: 'post',
    data,
  });
  return res.data;
};
