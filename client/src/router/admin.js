import AdminMain from '../views/AdminMain.vue';
import Store from '../store/index.js'

export default {
  path: '/admin',
  name: 'admin',
  component: AdminMain,
  // 네비게이션 가드 : admin만 관리자페이지(/admin) 접근 가능
  beforeEnter: (to, from, next) => {
    let member_type = Store.state.memberStore.memberInfo.member_type;
    let loginStatus =  Store.state.memberStore.loginStatus;
    console.log(member_type, ', ', loginStatus);
    if(member_type != 'b03' || !loginStatus ){
      alert('관리자만 접근 가능한 페이지입니다.'),
      next('/main');
    }
    else {
      next();
    }
  },
  children : [
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
    },

    //리뷰관리 페이지
    {
      path: '/admin/review',
      name: 'AReviewList',
      component: import(/* webpackChunkName: "productlist", webpackPrefetch: false */ '../views/admin/AReviewList.vue'),
      children: [
        {
          path: '/admin/reviewlist',
          name: 'ReviewListComp',
          component: import(/* webpackChunkName: "productlist", webpackPrefetch: false */ '../components/ReviewListComp.vue')
        }
      ]

    }
  ]
}