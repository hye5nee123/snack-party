<template>
  <h1>NoticeManage.vue</h1>
  <h1>$store : {{ $store.state.exampleStore.name }}</h1>
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
