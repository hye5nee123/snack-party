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
// import router from '@/router';

export default {
  name: "App",
  components: {
    Header,
    Footer
  }
  // ,
  // mounted () {
  //   console.log('mounted');
  //   this.$router.push('/user/main')
  // }
};
</script>

<style>
  @import "../assets/css/style.css";
</style>
