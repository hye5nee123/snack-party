import AdminMain from '../views/AdminMain.vue';

export default {
  path: '/admin',
  name: 'admin',
  component: AdminMain,
  children: [
    // 상품 페이지
    {
      path: '/admin/product',
      name: 'ProductManage',
      component: import(/* webpackChunkName: "productlist", webpackPrefetch: false */ '../views/admin/ProductManage.vue'),
      children: [
        {
          path: 'admin/productlist',
          name: 'AdminProductList',
          component: import(/* webpackChunkName: "productlist", webpackPrefetch: false */ '../components/AdminProductList.vue'),
        }
      ]
    },

    // 공지게시판 페이지
    {
      path: '/admin/notice',
      name: 'NoticeManage',
      component: import(/* webpackChunkName: "productlist", webpackPrefetch: false */ '../views/admin/NoticeManage.vue'),
      children: [
        {
          path: 'admin/noticelist',
          name: 'AdminNoticeList',
          component: import(/* webpackChunkName: "productlist", webpackPrefetch: false */ '../components/AdminNoticeList.vue'),
        }
      ]
    },

    // 주문관리 페이지
    {
      path: '/admin/order',
      name: 'OrderManage',
      component: import(/* webpackChunkName: "productlist", webpackPrefetch: false */ '../views/admin/OrderManage.vue'),
      children: [
        {
          path: 'admin/orderlist',
          name: 'AdminOrderList',
          component: import(/* webpackChunkName: "productlist", webpackPrefetch: false */ '../components/AdminOrderList.vue')
        }
      ]
    }
  ]
}