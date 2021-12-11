/* eslint-disable import/prefer-default-export */
import axios from '../../../request/axiosConfig';

// 新增类目
export const addCategory = async (categoryName) => {
  console.log('categoryName', categoryName);
  const res = await axios({
    url: '/Category/add',
    method: 'post',
    data: categoryName,
  });
  console.log('res', res);
  return res;
};

