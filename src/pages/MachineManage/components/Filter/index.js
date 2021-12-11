/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { Grid, Input, Select, Switch, Range } from '@alifd/next';
import { Button } from 'antd';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import { PROVICEOPT } from '../../../../utils';

const { Row, Col } = Grid;

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
              <span style={styles.formLabel}>机器/门店名称：</span>
              <IceFormBinder triggerType="onBlur" name="name">
                <Input placeholder="请输入" style={{ width: '200px' }} />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="name" />
              </div>
            </div>
          </Col>
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
          <Col l="8">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>状态：</span>
              <IceFormBinder triggerType="onBlur" name="status">
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
              <span style={styles.formLabel}>目标区间：</span>
              <IceFormBinder triggerType="onBlur" name="target">
                <Range
                  style={{ width: '240px' }}
                  slider="double"
                  defaultValue={[0, 20]}
                  marks={4}
                  max={20}
                  tipRender={value => `${value}万元`}
                />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="store" />
              </div>
            </div>
          </Col>
          <Col l="8">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>橱窗数量：</span>
              <IceFormBinder triggerType="onBlur" name="cellNum">
                <Range
                  style={{ width: '240px' }}
                  slider="double"
                  defaultValue={[0, 100]}
                  marks={10}
                  max={100}
                  tipRender={value => `${value}个`}
                />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="store" />
              </div>
            </div>
          </Col>
          <Col style={{ lineHeight: '52px' }} l="2">
            <Button
              style={{ width: '100%' }}
              type="primary"
              onClick={this.reset}
            >
              重置
            </Button>
          </Col>
        </Row>
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
