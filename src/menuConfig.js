// 菜单配置
// headerMenuConfig：头部导航配置
// asideMenuConfig：侧边导航配置

const headerMenuConfig = [
  {
    name: '库存预警商品',
    path: 'http://localhost:4444/#/warnGoods',
    external: true,
    newWindow: true,
    icon: 'notice',
    val: 'stockWarnNum',
  },
  {
    name: '临期预警商品',
    path: 'http://localhost:4444/#/warnGoods/',
    external: true,
    newWindow: true,
    icon: 'exchange',
    val: 'expWarnNum',
  },
  {
    name: '退出',
    path: '/user/login',
    icon: 'yonghu',
  },
];

const asideMenuConfig = [
  {
    name: '工作台',
    path: '/dashboard',
    icon: 'home2',
  },
  {
    name: '资产管理',
    path: '/asset',
    icon: 'rmb',
  },
  {
    name: '商品管理',
    path: '/goods',
    icon: 'item',
  },
  {
    name: '预警商品',
    path: '/warnGoods',
    icon: 'notice',
  },
  {
    name: '添加商品',
    path: '/add/goods',
    icon: 'publish',
  },
  {
    name: '类目管理',
    path: '/categoryManage',
    icon: 'ul-list',
  },
  {
    name: '订单管理',
    path: '/orderManage',
    icon: 'shopcar',
  },
  {
    name: '机器/门店管理',
    path: '/machine',
    icon: 'shop',
  },
  {
    name: '添加机器/门店',
    path: '/add/machine',
    icon: 'shezhi',
  },
  {
    name: '区域负责人管理',
    path: '/contact',
    icon: 'fans',
  },
  // {
  //   name: '预约管理',
  //   path: '/reserve',
  //   icon: 'clock',
  // },
  // {
  //   name: '添加预约',
  //   path: '/add/reserve',
  //   icon: 'edit2',
  // },
  // {
  //   name: '订单管理',
  //   path: '/order',
  //   icon: 'shopcar',
  // },
  // {
  //   name: '会员管理',
  //   path: '/membership',
  //   icon: 'menu',
  // },
];

export { headerMenuConfig, asideMenuConfig };
