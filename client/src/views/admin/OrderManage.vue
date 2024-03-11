<template>
  <div class="container-xxl flex-grow-1 container-p-y">
    <div class="card">
      <h3>주문조회</h3>
    </div>
  </div>
  <AdminOrderList />
</template>
<script>
import AdminOrderList from '../../components/admin/AdminOrderList.vue';

export default {
  name: 'NoticeManage',
  components: {
    AdminOrderList
  },
  data() {
    return {
    };
  },
  setup() { },
  created() {

  },
  mounted() { },
  unmounted() { },
  methods: {
  }
}
</script>
