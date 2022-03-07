import UserLogin from './pages/UserLogin';
import Dashboard from './pages/Dashboard';
import CityDetail from './pages/CityDetail';
import Goods from './pages/Goods';
import WarnGoods from './pages/WarnGoods';
import AddGoods from './pages/AddGoods';
import AddMachine from './pages/AddMachine';
import Category from './pages/CategoryManage';
import Machine from './pages/MachineManage';
import OrderManage from './pages/OrderManage';
import GlobalNoticeDetail from './pages/GlobalNoticeDetail';

// 路由配置
const routerConfig = [
  {
    path: '/user/login',
    component: UserLogin,
  },
  {
    path: '/dashboard',
    component: Dashboard,
  },
  {
    path: '/categoryManage',
    component: Category,
  },
  {
    path: '/cityDetail/:cityObj',
    component: CityDetail,
  },
  {
    path: '/goods',
    component: Goods,
  },
  {
    path: '/add/goods',
    component: AddGoods,
  },
  {
    path: '/warnGoods',
    component: WarnGoods,
  },
  {
    path: '/add/machine/:id',
    component: AddMachine,
  },
  {
    path: '/add/machine',
    component: AddMachine,
  },
  {
    path: '/machine',
    component: Machine,
  },
  {
    path: '/orderManage',
    component: OrderManage,
  },
  {
    path: '/globalNoticeDetail/:id/:isCity',
    component: GlobalNoticeDetail,
  },
  {
    path: '/edit/goods/:id',
    component: AddGoods,
  },
];

export default routerConfig;
