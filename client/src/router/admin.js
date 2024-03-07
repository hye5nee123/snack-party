import AdminMain from '../views/AdminMain.vue';
import NoticeManage from '../views/admin/NoticeManage.vue';
import AdminNoticeList from '../components/AdminNoticeList.vue';
import OrderManage from '../views/admin/OrderManage.vue';
import AdminOrderList from '../components/AdminOrderList.vue';
import AReviewList from '../views/admin/AReviewList.vue';
import ReviewListComp from '../components/ReviewListComp.vue';


export default {
  path: '/admin',
  name: 'admin',
  component: AdminMain,
  children: [
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