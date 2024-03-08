<template>
  <!-- Single Page Header start -->
  <div class="container-fluid page-header py-5">
    <h1 class="text-center text-white display-6"></h1>
    <ol class="breadcrumb justify-content-center mb-0">
      <h4><li class="breadcrumb-item active text-white">MyOrder</li></h4>
    </ol>
  </div>
  <!-- Single Page Header End -->

  <div class="container-fluid py-5">
    <div class="container py-5">
      <h3>주문상세내역</h3>
      <p>{{ merchant_uid }}</p>
    </div>
  </div>

</template>

<script>

export default {
  data() {
    return {
      merchant_uid: '',
    }
  },
  components: {

  },
  created() {
    this.merchant_uid = this.$route.query.merchant_uid;
  },
  methods: {

  }
}
</script>