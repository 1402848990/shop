/* eslint no-undef:0, no-unused-expressions:0, array-callback-return:0 */
import React, { Component } from 'react';
import { Nav } from '@alifd/next';
import { withRouter, Link } from 'react-router-dom';
import FoundationSymbol from '@icedesign/foundation-symbol';
import IceImg from '@icedesign/img';
import Logo from '../Logo';
import { asideMenuConfig } from '../../../../menuConfig';

import './Aside.scss';

@withRouter
export default class BasicLayout extends Component {
  render() {
    const { location } = this.props;
    const { pathname } = location;

    return (
      <div className="aside-custom-menu">
        <p style={{ color: '#3080fe', fontSize: '22px', textAlign: 'center', lineHeight: '62px', letterSpacing: '4px' }}>智慧监控分析系统</p>
        <div className="user-info">
          {/* <IceImg
            height={40}
            width={40}
            src={require('./images/avatar.png')}
            className="user-avatar"
          /> */}
          {/* <div className="user-profile">
            <span className="user-name" style={{ fontSize: '13px' }}>
              Admin
            </span>
          </div> */}
        </div>
        {/* 渲染侧边导航栏 */}
        <Nav
          selectedKeys={[pathname]}
          className="ice-menu-custom"
          activeDirection="right"
        >
          {Array.isArray(asideMenuConfig) &&
            asideMenuConfig.length > 0 &&
            asideMenuConfig.map((nav) => {
              return (
                <Nav.Item key={nav.path}>
                  <Link to={nav.path} className="ice-menu-link">
                    {nav.icon ? (
                      <FoundationSymbol size="small" type={nav.icon} />
                    ) : null}
                    <span className="ice-menu-item-text">{nav.name}</span>
                  </Link>
                </Nav.Item>
              );
            })}
        </Nav>
      </div>
    );
  }
}
