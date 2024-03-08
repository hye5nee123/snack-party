<template>
  <!-- Single Page Header start -->
  <div class="container-fluid page-header py-5">
    <h1 class="text-center text-white display-6">주문완료</h1>
    
  </div>
  <!-- Single Page Header End -->

  <!-- Cart Page Start -->
  <div class="container-fluid py-5">
    <div class="container py-5">
     
      <h3>결제완료</h3>
      {{merchant_uid}}
    </div>
  </div>
  <!-- Cart Page End -->
</template>
<script>
export default {
 data() {
  return {
    merchant_uid: '',
  }
 },
 created() {
  console.log(this.$route.query.merchant_uid)
  this.merchant_uid = this.$route.query.merchant_uid;
 }
}
</script>
