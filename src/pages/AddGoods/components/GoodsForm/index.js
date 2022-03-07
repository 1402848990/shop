// 新增、编辑商品页面

/* eslint-disable no-unused-expressions */
/* eslint react/no-string-refs:0 */
import React, { useState, useEffect, useRef } from 'react';
import IceContainer from '@icedesign/container';
import { Message } from '@alifd/next';
import { withRouter } from 'react-router-dom';
import { getCategoryList, addGood, getGoodDetail, updateGood } from '../../../../services';
import PageHead from '../../../../components/PageHead';
import BaseForm from '../../../../common/BaseForm';
import moment from 'moment';

export default withRouter((props) => {
  // 编辑时从url获取商品id
  const { id: goodId } = props.match.params || {};

  const formRef = useRef(null);

  const [categoryList, setCategoryList] = useState([]);

  // 获取类目列表
  async function fetchCategoryList() {
    const res = await getCategoryList();
    setCategoryList(res);
  }

  // 获取商品详情
  async function fetchGoodDetail() {
    console.log('goodId', goodId);
    console.log('formRef', formRef);
    if (goodId) {
      const res = await getGoodDetail(goodId);
      console.log('res', res);
      res.expiresAt = moment(+res.expiresAt);
      formRef?.current?.setFieldsValue(res);
    }
  }

  useEffect(() => {
    fetchCategoryList();
    fetchGoodDetail();
  }, []);

  // 提交方法
  const onSubmit = async (values) => {
    console.log('values', values);
    values.expiresAt ? values.expiresAt = values.expiresAt.valueOf() : null;
    values.salePrice ? null : delete values.salePrice;
    values.isDiscount = values.isDiscount ? 1 : 0;
    values.categoryId = +values.categoryId;
    values.categoryName = categoryList.find(
      i => i.id === values.categoryId
    ).categoryName;
    // 分为新增商品跟修改商品两种情况
    goodId ? await updateGood({ ...values, id: goodId }) : await addGood(values);
    Message.success('商品提交成功');
  };

  // 表单的配置项
  const columns = [
    {
      name: '商品名',
      field: 'name',
      required: true,
    },
    {
      name: '商品描述',
      field: 'desc',
      required: true,
    },
    {
      name: '库存量',
      field: 'stock',
      required: true,
      type: 'inputNumber',
      // defaultValue: 30,
    },
    {
      name: '商品类目',
      field: 'categoryId',
      required: true,
      type: 'select',
      option: categoryList.map((i) => {
        return { label: i.categoryName, value: +i.id };
      }),
    },
    {
      name: '成本价',
      field: 'rootPrice',
      required: true,
      type: 'inputNumber',
      others: { addonAfter: '元' },
    },
    {
      name: '商品价格',
      field: 'price',
      required: true,
      type: 'inputNumber',
      others: { addonAfter: '元' },
    },
    {
      name: '到期日期',
      field: 'expiresAt',
      required: true,
      type: 'datePicker',
    },
    {
      name: '是否折扣',
      field: 'isDiscount',
      type: 'switch',
    },
    {
      name: '折后价格',
      field: 'salePrice',
      type: 'inputNumber',
      others: { addonAfter: '元' },
    },
  ];

  return (
    <div>
      <PageHead title="添加商品" />
      <IceContainer style={{ padding: '40px' }}>
        {/* 商品表单 */}
        <BaseForm
          ref={formRef}
          onSubmit={onSubmit}
          others={{
            labelCol: { span: 3 },
            wrapperCol: { span: 8 },
            initialValues: {
              stock: 30,
              isDiscount: false,
            },
          }}
          columns={columns}
        />
      </IceContainer>
    </div>
  );
});
