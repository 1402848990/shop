import React, { Component } from 'react';
import Cookie from 'js-cookie';
import { Switch, Route, Redirect } from 'react-router-dom';
import NotFound from '../../components/NotFound';
import routerData from '../../routerConfig';


class MainRoutes extends Component {
  /**
   * 渲染路由组件
   */
  renderNormalRoute = (item, index) => {
    return item.component ? (
      <Route
        key={index}
        path={item.path}
        component={item.component}
        exact={item.exact}
      />
    ) : null;
  };

  render() {
    const token = Cookie.get('token');
    if (!token) {
      window.location.href = '/#/user/login';
    }
    return (
      <Switch>
        {/* 渲染路由表 */}
        {routerData.map(this.renderNormalRoute)}

        {/* 根路由默认重定向到 /dashboard */}
        <Redirect from="/" to="/user/login" />

        {/* 未匹配到的路由重定向到 NotFound */}
        <Route component={NotFound} />
      </Switch>
    );
  }
}

export default MainRoutes;
