<template>
  <div class="rounded position-relative fruite-item border border-secondary">
    <div class="fruite-img">
      <img :src="getImgUrl(productInfo.path)" class="img-fluid rounded-top imghw" alt=""
        @click="gotodetail(productInfo.product_code)" />
    </div>
    <div class="p-4 border-top-0 rounded-bottom">
      <div @click="gotodetail(productInfo.product_code)">
        <h4>{{ productInfo.product_name }}</h4>
      </div>
      <p class="text-dark fs-5 fw-bold mb-0">{{ getCurrencyFormat(productInfo.product_price) }}원</p>
      <br>
      <!--  -->
      <div class="d-flex justify-content-between flex-lg-wrap">
        <!-- heart -->
        <a href="#" class="btn border border-secondary rounded-pill px-3 text-primary" @click="likes()">
        <i v-bind:class="{ nondisplay: isActive, display:true }" class="fa-regular fa-heart"></i>
        <i v-bind:class="{ red: isActive, nondisplay: !isActive, display:true }" class="fa-solid fa-heart"></i> 관심상품</a>
        <!-- <svg @click="likes()" v-bind:class="{ active: isActive }" xmlns="http://www.w3.org/2000/svg" width="16"
            height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
            <path
              d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
          </svg> -->

        <a href="#" class="btn border border-secondary rounded-pill px-3 text-primary">
          <i class="fa fa-shopping-bag me-2 text-primary"></i>장바구니</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    productInfo: {
      type: Object
    }
  },
  data() {
    return {
      pressLike: false,
      isActive: false,
    };
  },
  methods: {
    likes() {
      if (this.pressLike == false) {
        this.isActive = true;
        this.pressLike = true;
      } else {
        this.isActive = false;
        this.pressLike = false;
      }
    },
    getImgUrl(path) {
      return new URL(this.url + '/common/download?path=' + path);
    },
    getCurrencyFormat(value) {
      return this.$currencyFormat(value);
    },
    gotodetail(pcode) {
      this.$router.push({ name: 'ProductInfo', query: { 'product_code': pcode } });
    }
  }
};
</script>

<style>
/* @import '../assets/css/style.css'; */
.red {
  color: red;
}

.nondisplay {
  display: none;
}

.display {
  line-height: inherit;
  margin: auto 0;
}
</style>
