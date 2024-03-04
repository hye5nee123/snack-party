import AdminMain from '../views/AdminMain.vue';
import NoticeManage from '../views/admin/NoticeManage.vue';
import AdminNoticeList from '../components/AdminNoticeList.vue';
import OrderManage from '../views/admin/OrderManage.vue';
import AdminOrderList from '../components/AdminOrderList.vue';


export default {

  path: '/admin',
  name: 'admin',
  component: AdminMain,
  children : [
    // 공지게시판 페이지
    {
      path : '/admin/notice',
      name : 'NoticeManage',
      component : NoticeManage,
      children : [
        {
          path : '/admin/noticelist',
          name : 'AdminNoticeList',
          component : AdminNoticeList
        }
      ]
    },

    // 주문관리 페이지
    {
      path : '/admin/order',
      name : 'OrderManage',
      component : OrderManage,
      children : [
        {
          path : '/admin/orderlist',
          name : 'AdminOrderList',
          component : AdminOrderList
        }
      ]
    }
  ]

}