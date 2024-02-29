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
  @import "../assets/css/demo.css";
  @import "../assets/css/core.css";
  @import "../assets/css/page-account-settings.css";
  @import "../assets/css/page-auth.css";
  @import "../assets/css/page-icons.css";
  @import "../assets/css/page-misc.css";
  @import "../assets/css/theme-default.css";
</style>