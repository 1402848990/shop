import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Grid, Icon, Balloon } from '@alifd/next';

const { Row, Col } = Grid;

export default class Overview extends Component {
  render() {
    const { data = [], title = '', col = 4 } = this.props;
    return (
      <IceContainer title={title}>
        <Row wrap>
          {data.map((item, index) => {
            const hasBorder = (index + 1) % col !== 0 ? styles.border : {};
            return (
              <Col
                l={24 / col}
                key={index}
                style={{ ...styles.item, ...hasBorder }}
              >
                <div style={styles.title}>{item.title}</div>
                <div style={styles.value}>
                  <span style={{ color: item.color }}>{item.value}</span>
                </div>
              </Col>
            );
          })}
        </Row>
      </IceContainer>
    );
  }
}

const styles = {
  item: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '20px 0',
  },
  border: {
    borderRight: '1px solid #F0F0F0',
  },
  title: {
    fontSize: '18px',
    fontWeight: 600,
    marginBottom: '10px',
  },
  value: {
    fontSize: '24px',
    fontWeight: 600,
  },
};
