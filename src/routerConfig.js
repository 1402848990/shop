
import Dashboard from './pages/Dashboard';
import GlobalNoticeDetail from './pages/GlobalNoticeDetail';
import CityDetail from './pages/CityDetail';

// 路由配置
const routerConfig = [
  {
    path: '/dashboard',
    component: Dashboard,
  },
  {
    path: '/cityDetail/:cityObj',
    component: CityDetail,
  },
  {
    path: '/globalNoticeDetail/:id/:isCity',
    component: GlobalNoticeDetail,
  },
];

export default routerConfig;
