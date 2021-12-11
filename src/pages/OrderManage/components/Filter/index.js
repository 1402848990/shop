/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { Grid, Input, Select, Switch, Range, DatePicker } from '@alifd/next';
import { Button } from 'antd';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import { PROVICEOPT } from '../../../../utils';

const { Row, Col } = Grid;
const RangePicker = DatePicker.RangePicker;

export default class Filter extends Component {
  state = {
    value: {},
  };

  formChange = (value) => {
    console.log(this.state.value);
    this.props.onChange({ filter: this.state.value });
  };

  // 重置
  reset = () => {
    this.setState({ value: {} });
    this.props.onChange();
  };

  render() {
    return (
      <IceFormBinderWrapper
        value={this.state.value}
        onChange={this.formChange}
        ref="form"
      >
        <Row wrap gutter="20" style={styles.formRow}>
          <Col l="8">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>商品名称：</span>
              <IceFormBinder triggerType="onBlur" name="goodName">
                <Input placeholder="请输入" style={{ width: '200px' }} />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="name" />
              </div>
            </div>
          </Col>
          {this.props.machineId ? null : (
            <Col l="8">
              <div style={styles.formItem}>
                <span style={styles.formLabel}>归属区域：</span>
                <IceFormBinder triggerType="onBlur" name="localId">
                  <Select style={{ width: '200px' }}>
                    {PROVICEOPT().map(i => (
                      <Select.Option value={i.value}>{i.label}</Select.Option>
                    ))}
                  </Select>
                </IceFormBinder>
                <div style={styles.formError}>
                  <IceFormError name="store" />
                </div>
              </div>
            </Col>
          )}

          <Col l="8">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>是否促销：</span>
              <IceFormBinder triggerType="onBlur" name="isDiscount">
                <Switch />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="store" />
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col l="8">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>商品类目：</span>
              <IceFormBinder triggerType="onBlur" name="categoryId">
                <Select style={{ width: '200px' }}>
                  {this.props.categoryList.map(i => (
                    <Select.Option value={i.id} key={i.id}>
                      {i.categoryName}
                    </Select.Option>
                  ))}
                </Select>
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="cate" />
              </div>
            </div>
          </Col>
          {this.props.machineId ? (
            <Col l="8">
              <div style={styles.formItem}>
                <span style={styles.formLabel}>下单时间：</span>
                <IceFormBinder triggerType="onBlur" name="timeRange">
                  <RangePicker />
                </IceFormBinder>
                <div style={styles.formError}>
                  <IceFormError name="store" />
                </div>
              </div>
            </Col>
          ) : (
            <Col l="8">
              <div style={styles.formItem}>
                <span style={styles.formLabel}>归属机器：</span>
                <IceFormBinder triggerType="onBlur" name="machineId">
                  <Select style={{ width: '200px' }}>
                    {this.props.machineList?.map(i => (
                      <Select.Option value={i.id}>{i.name}</Select.Option>
                    ))}
                  </Select>
                </IceFormBinder>
                <div style={styles.formError}>
                  <IceFormError name="store" />
                </div>
              </div>
            </Col>
          )}
          <Col style={{ lineHeight: '52px' }} l="2" offset={2}>
            <Button
              style={{ width: '100%' }}
              type="primary"
              onClick={this.reset}
            >
              重置
            </Button>
          </Col>
        </Row>
        {this.props.machineId ? null : (
          <Row>
            <Col l="8">
              <div style={styles.formItem}>
                <span style={styles.formLabel}>下单时间：</span>
                <IceFormBinder triggerType="onBlur" name="timeRange">
                  <RangePicker />
                </IceFormBinder>
                <div style={styles.formError}>
                  <IceFormError name="store" />
                </div>
              </div>
            </Col>
          </Row>
        )}
      </IceFormBinderWrapper>
    );
  }
}

const styles = {
  formItem: {
    display: 'flex',
    alignItems: 'center',
    margin: '10px 0',
  },
  formLabel: {
    minWidth: '80px',
  },
};
