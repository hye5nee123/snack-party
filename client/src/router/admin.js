import AdminMain from '../views/AdminMain.vue';
import NoticeManage from '../views/admin/NoticeManage.vue';
import AdminNoticeList from '../components/AdminNoticeList.vue';
import OrderManage from '../views/admin/OrderManage.vue';
import AdminOrderList from '../components/AdminOrderList.vue';
import AReviewList from '../views/admin/AReviewList.vue';
import ReviewListComp from '../components/ReviewListComp.vue';
import Store from '../store/index';


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
      component: NoticeManage,
      children: [
        {
          path: '/admin/noticelist',
          name: 'AdminNoticeList',
          component: AdminNoticeList
        }
      ]
    },

    // 주문관리 페이지
    {
      path: '/admin/order',
      name: 'OrderManage',
      component: OrderManage,
      children: [
        {
          path: '/admin/orderlist',
          name: 'AdminOrderList',
          component: AdminOrderList
        }
      ]
    },

    //리뷰관리 페이지
    {
      path: '/admin/review',
      name: 'AReviewList',
      component: AReviewList,
      children: [
        {
          path: '/admin/reviewlist',
          name: 'ReviewListComp',
          component: ReviewListComp
        }
      ]

    }
  ]
}