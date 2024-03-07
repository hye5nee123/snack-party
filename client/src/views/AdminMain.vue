<template>
  <div class="layout-wrapper layout-content-navbar">
    <div class="layout-container">
      <Sidebar />
      <div class="layout-page">
        <router-view/>
      </div>
  </div>
</div>
</template>
<script>
import Sidebar from '../layout/AdminSidebar.vue'

export default {
  name: "App",
  components: {
    Sidebar
  }
};
</script>

<style>
  @import "../assets/css/admin/demo.css";
  @import "../assets/css/admin/core.css";
  @import "../assets/css/admin/page-account-settings.css";
  @import "../assets/css/admin/page-auth.css";
  @import "../assets/css/admin/page-icons.css";
  @import "../assets/css/admin/page-misc.css";
  @import "../assets/css/admin/theme-default.css";
</style> 