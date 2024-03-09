<template>
  <div class="container">
    <div class="container-xxl flex-grow-1 container-p-y">
      <div class="card">
        <h3>공지관리</h3>
      </div>
    </div>
    <AdminNoticeList />
  </div>
  
</template>
<script>
import AdminNoticeList from '../../components/admin/AdminNoticeList.vue';
// import ModalComp from '../../components/ModalComp.vue';

export default{ 
  name:'NoticeManage',
  components:{
    AdminNoticeList,
    // ModalComp
  },
}
</script>
<style>
.card {
  padding: 20px;
}
</style>