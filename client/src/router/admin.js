import AdminMain from '../views/AdminMain.vue';
import NoticeManage from '../views/admin/NoticeManage.vue';
import AdminNoticeList from '../components/AdminNoticeList.vue';

export default {

  path: '/admin',
  name: 'admin',
  component: AdminMain,
  children : [
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
    }
  ]

}