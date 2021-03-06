// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容
// 变量名 routerConfig 为 iceworks 检测关键字，请不要修改名称

import UserLogin from './pages/UserLogin';
import UserRegister from './pages/UserRegister';
import Dashboard from './pages/Dashboard';
import Reserve from './pages/Reserve';
import Asset from './pages/Asset';
import OrderList from './pages/OrderList';
import Goods from './pages/Goods';
import WarnGoods from './pages/WarnGoods';
import Membership from './pages/Membership';
import AddReserve from './pages/AddReserve';
import AddGoods from './pages/AddGoods';
import AddMachine from './pages/AddMachine';
import Category from './pages/CategoryManage';
import Machine from './pages/MachineManage';
import OrderManage from './pages/OrderManage';
import Contact from './pages/Contact';

const routerConfig = [
  {
    path: '/user/login',
    component: UserLogin,
  },
  {
    path: '/user/register',
    component: UserRegister,
  },
  {
    path: '/dashboard',
    component: Dashboard,
  },
  {
    path: '/reserve',
    component: Reserve,
  },
  {
    path: '/categoryManage',
    component: Category,
  },
  {
    path: '/asset',
    component: Asset,
  },
  {
    path: '/goods',
    component: Goods,
  },
  {
    path: '/order',
    component: OrderList,
  },
  {
    path: '/membership',
    component: Membership,
  },
  {
    path: '/add/reserve',
    component: AddReserve,
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
    path: '/Contact',
    component: Contact,
  },
  {
    path: '/edit/goods/:id',
    component: AddGoods,
  },
];

export default routerConfig;
