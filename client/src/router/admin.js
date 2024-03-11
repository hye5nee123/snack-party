import AdminMain from '../views/AdminMain.vue';
import Store from '../store/index.js'

export default {
  path: '/admin',
  name: 'admin',
  component: AdminMain,
  redirect: "/admin/main",
  // 네비게이션 가드 : admin만 관리자페이지(/admin) 접근 가능
  beforeEnter: (to, from, next) => {
    let member_type = Store.state.memberStore.memberInfo.member_type;
    let loginStatus = Store.state.memberStore.loginStatus;
    console.log(member_type, ', ', loginStatus);
    if (member_type != 'b03' || !loginStatus) {
      alert('관리자만 접근 가능한 페이지입니다.'),
        next('/main');
    }
    else {
      next();
    }
  },
  children: [
    {
      path: "/admin/main",
      name: "AdminHome",
      component: import(/* webpackChunkName: "AdminHome", webpackPrefetch: false */ '../views/admin/AdminHome.vue'),
    },
    // 상품관리 페이지
    {
      path: '/admin/product',
      name: 'ProductManage',
      component: import(/* webpackChunkName: "ProductManage", webpackPrefetch: false */ '../views/admin/ProductManage.vue'),
      redirect: '/admin/product/productlist',
      children: [
        {
          path: 'productlist',
          name: 'AdminProductList',
          component: import(/* webpackChunkName: "AdminProductList", webpackPrefetch: false */ '../components/admin/AdminProductList.vue'),
        },
        {
          path: 'productinfo',
          name: 'AdminProductInfo',
          component: import(/* webpackChunkName: "AdminProductInfo", webpackPrefetch: false */ '../components/admin/AdminProductInfo.vue'),
        },
        {
          path: 'productform',
          name: 'AdminProductForm',
          component: import(/* webpackChunkName: "AdminProductForm", webpackPrefetch: false */ '../components/admin/AdminProductForm.vue'),
        },
        {
          path: 'productwarehousing',
          name: 'AdminProductWarehousing',
          component: import(/* webpackChunkName: "AdminProductWarehousing", webpackPrefetch: false */ '../components/admin/AdminProductWarehousing.vue'),
        }
      ]
    },
    // 공지게시판 페이지
    {
      path: '/admin/notice',
      name: 'NoticeManage',
      component: import(/* webpackChunkName: "NoticeManage", webpackPrefetch: false */ '../views/admin/NoticeManage.vue'),
    },

    // 주문관리 페이지
    {
      path: '/admin/order',
      name: 'OrderManage',
      component: import(/* webpackChunkName: "OrderManage", webpackPrefetch: false */ '../views/admin/OrderManage.vue'),
    },
    {
      path: '/admin/order/orderdetail',
      name: 'AdminOrderDetail',
      component: import(/* webpackChunkName: "AdminOrderDetail", webpackPrefetch: false */ '../views/admin/AdminOrderDetail.vue'),
    }

    ,

    //리뷰관리 페이지
    {
      path: '/admin/review',
      name: 'BoardManage',
      component: import(/* webpackChunkName: "BoardManage", webpackPrefetch: false */ '../views/admin/BoardManage.vue'),
    }
  ]
}