<template>
  <h1>NoticeManage.vue</h1>
  <AdminNoticeList />
</template>
<script>
import AdminNoticeList from '../../components/AdminNoticeList.vue';

export default{ 
  name:'NoticeManage',
  components:{
    AdminNoticeList
  },
  data(){
    return{
      sampleData:''
    };
  },
  setup(){},
  created(){},
  mounted(){},
  unmounted(){},
  methods:{}
}
</script>
