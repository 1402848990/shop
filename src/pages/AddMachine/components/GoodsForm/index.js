/* eslint-disable no-unused-expressions */
/* eslint react/no-string-refs:0 */
import React, { useState, useEffect, useRef } from 'react';
import IceContainer from '@icedesign/container';
import { Message, Dialog, Button } from '@alifd/next';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import {
  addMachine,
  getMachineDetail,
  updateMachine,
  getContactList,
  getGoodsList,
  updateGood,
} from '../../../../services';
import { PROVICEOPT, PROVINCE } from '../../../../utils';
import PageHead from '../../../../components/PageHead';
import BaseForm from '../../../../common/BaseForm';
import BaseTable from '../../../../common/BaseTable';
import OrderManage from '../../../OrderManage';

export default withRouter((props) => {
  // 编辑时从url获取机器/门店id
  const { id: machineId } = props.match.params || {};

  const formRef = useRef(null);

  const [contactList, setcontactList] = useState([]);
  const [goodList, setGoodList] = useState([]);
  const [beLongGoodList, setBeLongGoodList] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedGoodIds, setSelectedGoodIds] = useState('');
  const [nowSelected, setNowSelected] = useState('');
  // const [machineDetail, setMachineDetail] = useState({});

  // 获取负责人列表
  async function fetchcontactList() {
    const res = await getContactList();
    setcontactList(res);
  }

  // 获取商品列表
  async function fetchGoodList() {
    const res = await getGoodsList();
    setGoodList(res);
  }

  // 获取机器下的商品列表以及对应数据
  async function fetchGoodListBelong() {
    if (selectedGoodIds) {
      const res = await getGoodsList({ filter: { ids: selectedGoodIds } });
      setBeLongGoodList(res);
    }
  }

  // 获取机器/门店详情
  async function fetchMachineDetail() {
    console.log('machineId', machineId);
    console.log('formRef', formRef);
    if (machineId) {
      const res = await getMachineDetail(machineId);
      res.target /= 10000;
      console.log('res', res);
      formRef?.current?.setFieldsValue(res);
      // 存一下当前机器已上架的商品id
      res.goodIds
        ? setSelectedGoodIds(res.goodIds ? res.goodIds.split(',') : [])
        : null;
    }
  }

  useEffect(() => {
    fetchcontactList();
    fetchMachineDetail();
    fetchGoodList();
  }, []);

  useEffect(() => {
    fetchGoodListBelong();
  }, [selectedGoodIds]);

  // 提交方法
  const onSubmit = async (values) => {
    console.log('values', values, contactList);
    values.local = PROVINCE[values.localId];
    values.personId = +values.personId;
    values.status = +values.status;
    values.target = +values.target * 10000;
    values.personName = contactList.find(i => i.id == values.personId).name;
    // 分为新增机器、门店 跟 修改机器、门店两种情况
    machineId
      ? await updateMachine({ ...values, id: machineId })
      : await addMachine(values);
    Message.success('机器/门店提交成功');
  };

  // 表单的配置项
  const columns = [
    {
      name: '机器/门店名',
      field: 'name',
      required: true,
    },
    {
      name: '机器/门店备注',
      field: 'desc',
      required: true,
    },
    {
      name: '年度目标',
      field: 'target',
      required: true,
      type: 'slider',
      props: {
        tip: value => `${value}万元`,
        max: 20,
      },
    },
    {
      name: '仓位数量',
      field: 'cellNum',
      required: true,
      type: 'slider',
      props: {
        tip: value => `${value}个`,
        max: 30,
        min: 10,
      },
    },
    {
      name: '负责人',
      field: 'personId',
      required: true,
      type: 'select',
      option: contactList.map((i) => {
        return {
          label: `${i.name}--${i.ownerLocal}--${i.sex}--${i.phone}`,
          value: +i.id,
        };
      }),
    },
    {
      name: '区域',
      required: true,
      field: 'localId',
      type: 'select',
      option: PROVICEOPT(),
    },
    {
      name: '状态',
      field: 'status',
      type: 'switch',
    },
  ];

  const onClose = () => {
    setVisible(false);
    setNowSelected('');
  };

  // 上架商品方法
  const handleOk = async () => {
    console.log('nowSelected', nowSelected);
    if (nowSelected) {
      await updateMachine({
        goodIds: `${[...selectedGoodIds].join(',')},${nowSelected}`,
        id: machineId,
      });
      await fetchMachineDetail();
      Message.success('商品上架成功');
      setNowSelected('');
    } else {
      Message.error('请选择商品');
    }
  };

  // 下架商品方法
  const handleDownGood = (id) => {
    Dialog.confirm({
      title: '提示',
      content: '确认下架次商品吗',
      onOk: async () => {
        await updateMachine({
          goodIds: selectedGoodIds.filter(i => i != id).join(','),
          id: machineId,
        });
        fetchGoodListBelong();
        fetchMachineDetail();
      },
    });
  };

  // 产品列表表格配置
  const goodsColumns = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 100,
    },
    {
      title: '产品',
      dataIndex: 'name',
      width: 150,
    },
    {
      title: '类目',
      dataIndex: 'categoryName',
      width: 100,
    },
    {
      title: '现价',
      dataIndex: 'salePrice',
      render: (_, item) => (item.isDiscount ? item.salePrice : item.price),
      width: 100,
    },
    {
      title: '是否折扣',
      dataIndex: 'isDiscount',
      render: val => (val ? '是' : '否'),
    },
    {
      title: '原价',
      dataIndex: 'price',
      width: 100,
    },
    {
      title: '成本价',
      dataIndex: 'rootPrice',
      width: 100,
    },
    {
      title: '库存',
      dataIndex: 'stock',
      width: 80,
    },
    {
      title: '过期时间',
      dataIndex: 'expiresAt',
      render: text => moment(+text).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      render: text => moment(+text).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '操作',
      dataIndex: 'opea',
      width: 100,
      render: (_, { id }) => (
        <Button
          key={id}
          type="primary"
          warning
          onClick={() => handleDownGood(id)}
        >
          下架
        </Button>
      ),
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        'selectedRows: ',
        selectedRows
      );
      setNowSelected(selectedRowKeys);
      // setSelectedGoodIds(selectedRowKeys);
    },
    getCheckboxProps: record => ({
      disabled: selectedGoodIds.includes(`${record.id}`),
      name: record.name,
      value: record.id,
      // selectedRowKeys: selectedGoodIds,
    }),
  };

  console.log('selectedGoodIds', selectedGoodIds);

  return (
    <div>
      <PageHead
        title="添加无人售货机器/门店"
        buttonText="上架/下架商品"
        onClick={() => {
          setVisible(true);
        }}
      />
      {/* 上架商品弹窗 */}
      <Dialog
        title="上架商品"
        visible={visible}
        onOk={handleOk}
        onCancel={onClose}
        onClose={onClose}
      >
        <BaseTable
          rowSelection={rowSelection}
          columns={goodsColumns}
          dataSource={goodList}
        />
      </Dialog>
      <IceContainer style={{ padding: '40px' }}>
        <BaseForm
          ref={formRef}
          onSubmit={onSubmit}
          others={{
            labelCol: { span: 3 },
            wrapperCol: { span: 8 },
            initialValues: {
              target: 5,
              status: true,
            },
          }}
          columns={columns}
        />
      </IceContainer>
      <IceContainer
        title="已上架商品"
        style={{
          padding: '40px',
          textAlign: 'center',
          fontSize: '20px',
          lineHeight: '20px',
        }}
      >
        <BaseTable
          columns={goodsColumns}
          dataSource={beLongGoodList}
          scrollX={1450}
        />
      </IceContainer>
      <IceContainer
        style={{
          padding: '40px',
          textAlign: 'center',
          lineHeight: '20px',
        }}
      >
        <OrderManage machineId={machineId} />
      </IceContainer>
    </div>
  );
});
