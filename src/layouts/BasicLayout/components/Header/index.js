import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Nav } from '@alifd/next';
import FoundationSymbol from '@icedesign/foundation-symbol';
import { headerMenuConfig } from '../../../../menuConfig';
import { getGoodsList } from '../../../../services';
import './index.scss';

@withRouter
export default class Header extends Component {
  state = {
    goods: [],
    expWarnNum: 0,
    stockWarnNum: 0,
  };

  // 获取商品列表
  fetchGoodsList = async (filter = {}) => {
    const res = await getGoodsList(filter);
    this.setState({
      goods: res,
      expWarnNum: res.filter(i => i.expiresWarn).length || 0,
      stockWarnNum: res.filter(i => i.stockWarn).length || 0,
    });
  };

  componentDidMount() {
    // this.fetchGoodsList();
  }

  render() {
    const { location = {} } = this.props;
    const { pathname } = location;
    return (
      <div className="header-container">
        <div className="header-navbar">
          <Nav
            className="header-navbar-menu"
            selectedKeys={[pathname]}
            defaultSelectedKeys={[pathname]}
            direction="hoz"
            type="secondary"
          >
            {headerMenuConfig &&
              headerMenuConfig.length > 0 &&
              headerMenuConfig.map((nav, index) => {
                if (nav.children && nav.children.length > 0) {
                  return (
                    <Nav.SubNav
                      triggerType="click"
                      key={index}
                      title={
                        <span>
                          {nav.icon ? (
                            <FoundationSymbol size="small" type={nav.icon} />
                          ) : null}
                          <span>
                            {nav.name}
                            {nav.val ? `【${this.state[nav.val]}】` : ''}
                          </span>
                        </span>
                      }
                    >
                      {nav.children.map((item) => {
                        const linkProps = {};
                        if (item.external) {
                          if (item.newWindow) {
                            linkProps.target = '_blank';
                          }

                          linkProps.href = item.path;
                          return (
                            <Nav.Item key={item.path}>
                              <a {...linkProps}>
                                <span>{item.name}</span>
                              </a>
                            </Nav.Item>
                          );
                        }
                        linkProps.to = item.path;
                        return (
                          <Nav.Item key={item.path}>
                            <Link {...linkProps}>
                              <span>{item.name}</span>
                            </Link>
                          </Nav.Item>
                        );
                      })}
                    </Nav.SubNav>
                  );
                }
                const linkProps = {};
                if (nav.external) {
                  if (nav.newWindow) {
                    linkProps.target = '_blank';
                  }
                  linkProps.href = nav.path;
                  return (
                    <Nav.Item key={nav.path}>
                      <a {...linkProps}>
                        <span>
                          {nav.icon ? (
                            <FoundationSymbol size="small" type={nav.icon} />
                          ) : null}
                          {nav.name}
                          {nav.val ? (
                            <span style={{ color: '#ffeb3b' }}>{`【${
                            this.state[nav.val]
                          }】`}
                            </span>
                        ) : (
                          ''
                        )}
                        </span>
                      </a>
                    </Nav.Item>
                  );
                }
                linkProps.to = nav.path;
                return (
                  <Nav.Item key={nav.path}>
                    <Link {...linkProps}>
                      <span>
                        {nav.icon ? (
                          <FoundationSymbol size="small" type={nav.icon} />
                        ) : null}
                        {nav.name}
                        {nav.val ? (
                          <span style={{ color: 'red' }}>{`【${
                            this.state[nav.val]
                          }】`}
                          </span>
                        ) : (
                          ''
                        )}
                      </span>
                    </Link>
                  </Nav.Item>
                );
              })}
          </Nav>
        </div>
      </div>
    );
  }
}
