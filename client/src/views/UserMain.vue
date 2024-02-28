<template>
  <div>
  <Header />
  </div>
  <div>
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
  </div>
  <router-view />
  <div>
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
