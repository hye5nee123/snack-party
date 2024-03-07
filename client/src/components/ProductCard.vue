<template>
  <div class="rounded position-relative fruite-item border border-secondary">
    <div class="fruite-img">
      <div style="filter: brightness(0.5);" v-if="productInfo.stock_cnt == 0">
        <img :src="getImgUrl(productInfo.path)" class="img-fluid rounded imghw" alt=""
          @click="gotodetail(productInfo.product_code)" />
      </div>
      <div v-else>
        <img :src="getImgUrl(productInfo.path)" class="img-fluid rounded imghw" alt=""
          @click="gotodetail(productInfo.product_code)" />
      </div>
    </div>
    <div class="p-4 border-top-0 rounded-bottom">
      <div @click="gotodetail(productInfo.product_code)">
        <h4 class="sheight">{{ productInfo.product_name }}
          <!-- 품절 배지 -->
          <span class="badge bg-danger" v-if="productInfo.stock_cnt == 0">품절</span>
        </h4>
      </div>
      <p class="text-dark fs-5 fw-bold mb-0">{{ getCurrencyFormat(productInfo.product_price) }}원</p>
      <br>
      <!--  -->
      <div class="d-flex justify-content-between flex-lg-wrap">
        <!-- heart -->
        <a href="#" class="btn border border-secondary rounded-pill px-3 text-primary" @click="likes()">
          <i :class="{ nondisplay: isActive, display: true }" class="fa-regular fa-heart"></i>
          <i :class="{ red: isActive, nondisplay: !isActive, display: true }" class="fa-solid fa-heart"></i>
          관심상품</a>

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
    },
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

.sheight {
  height: 57.59px;
}
</style>
