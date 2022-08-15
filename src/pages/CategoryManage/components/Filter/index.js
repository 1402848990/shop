/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { debounce } from 'lodash';
import { Grid, Input, Select, Switch } from '@alifd/next';
import { Button } from 'antd';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';

const { Row, Col } = Grid;

export default class Filter extends Component {
  state = {
    value: {},
  };

  formChange =debounce(() => {
    console.log(this.state.value);
    this.props.onChange(this.state.value);
  }, 250) ;

  // 重置
  reset = () => {
    this.setState({ value: {} });
    this.props.onChange();
  };

  render() {
    const { platformList = [] } = this.props;
    return (
      <IceFormBinderWrapper
        value={this.state.value}
        onChange={this.formChange}
        ref="form"
      >
        <Row wrap gutter="20" style={styles.formRow}>
          <Col l="6">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>藏品名称：</span>
              <IceFormBinder triggerType="onBlur" name="name">
                <Input placeholder="请输入" style={{ width: '200px' }} />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="name" />
              </div>
            </div>
          </Col>
          <Col l={1} />
          <Col l="8">
            <div style={styles.formItem}>
              <span style={{ minWidth: '110px' }}>所属藏品平台：</span>
              <IceFormBinder triggerType="onBlur" name="categoryId">
                <Select style={{ width: '100%' }}>
                  <Select.Option value={null} key="null">
                    全部平台
                  </Select.Option>
                  {platformList.map(i => (
                    <Select.Option value={i.id} key={i.id}>
                      {i.name}
                    </Select.Option>
                  ))}
                </Select>
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="cate" />
              </div>
            </div>
          </Col>

          {/* <Col style={{ lineHeight: '52px' }} l="2">
            <Button
              style={{ width: '100%' }}
              type="primary"
              onClick={this.reset}
            >
              重置
            </Button>
          </Col> */}
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
