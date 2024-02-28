<template>
  <div>
    <Header />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Header from '../layout/Header.vue'
import Footer from '../layout/Footer.vue'

export default {
  name: "App",
  components: {
    Header,
    Footer
  }
};
</script>

<style>
@import "../assets/css/style.css";
</style>
