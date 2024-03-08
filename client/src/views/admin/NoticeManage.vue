<template>
  <div class="container">
    <h1>NoticeManage.vue</h1>
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
  data(){
    return{
     
    };
  },
  setup(){},
  created(){

  },
  mounted(){},
  unmounted(){},
  methods:{
  }
}
</script>
../../components/admin/AdminNoticeList.vue