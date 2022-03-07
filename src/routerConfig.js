
import Dashboard from './pages/Dashboard';
import GlobalNoticeDetail from './pages/GlobalNoticeDetail';

// 路由配置
const routerConfig = [
  {
    path: '/dashboard',
    component: Dashboard,
  },
  {
    path: '/globalNoticeDetail/:id/:isCity',
    component: GlobalNoticeDetail,
  },
];

export default routerConfig;
