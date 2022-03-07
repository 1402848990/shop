import React, { Component } from 'react';
import Layout from '@icedesign/layout';
import MainRoutes from './MainRoutes';
import './index.scss';

export default class BasicLayout extends Component {
  render() {
    return (
      <Layout
        fixable
        style={{ minHeight: '100vh' }}
        className="ice-design-layout"
      >
        <Layout.Section>
          <Layout.Main scrollable>
            <div className="main-container">
              <MainRoutes />
            </div>
          </Layout.Main>
        </Layout.Section>
      </Layout>
    );
  }
}
