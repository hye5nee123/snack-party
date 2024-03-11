<template>
    <div class="container-xxl flex-grow-1 container-p-y">
      <div class="card">
        <h3>회원조회</h3>
      </div>
    </div>
    <AdminMemberList />
  </template>

<script>
import AdminMemberList from '../../components/admin/AdminMemberList.vue';

export default {
  components: {
    AdminMemberList
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