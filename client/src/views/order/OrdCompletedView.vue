<template>
  <!-- Single Page Header start -->
  <div class="container-fluid page-header py-5">
    <h1 class="text-center text-white display-6"></h1>
  </div>
  <!-- Single Page Header End -->
  <div class="container-fluid py-5">
    <div class="container py-5">

      <!-- 주문완료페이지 -->
    </div>
  </div>

  <!-- <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">title</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            content
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div> -->

  <div class="container item">
  <div class="col-sm-8 col-md-7 col-lg-6 col-xl-4">
    <div class="bg-light rounded all-page">
      <div class="p-4">
        <br>
        <h1 class="display-6 mb-4">주문완료</h1>
        
          <h5>주문번호 {{ merchant_uid }}</h5>
        
        <div class="d-flex justify-content-between">
          <h5 class="mb-0 me-4">Shipping</h5>
          <div class="">
            <p class="mb-0">Flat rate: $3.00</p>
          </div>
        </div>
        <p class="mb-0 text-end">Shipping to Ukraine.</p>
      </div>
      <div class="py-4 mb-4 border-top border-bottom d-flex justify-content-between">
        <h5 class="mb-0 ps-4 me-4">Total</h5>
        <p class="mb-0 pe-4">$99.00</p>
      </div>
      <button class="btn border-secondary rounded-pill px-4 py-3 text-primary text-uppercase mb-4 ms-4"
        type="button">Proceed Checkout</button>
    </div>
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
  created() {
    this.merchant_uid = this.$route.query.merchant_uid;
  }
}
</script>

<style>
.item {
  align-items: center;
}
.all-page {
  width: 900px;
  height: 800px;
  text-align: center;
}
</style>
