<template>
  <!-- Single Page Header start -->
  <div class="container-fluid page-header py-5">
    <h1 class="text-center text-white display-6">찜 상품</h1>
    <ol class="breadcrumb justify-content-center mb-0">
      <li class="breadcrumb-item"><a href="/productlist">Product</a></li>
      <!-- <li class="breadcrumb-item"><a href="#">Pages</a></li> -->
      <li class="breadcrumb-item active text-white">Like</li>
    </ol>
  </div>
  <!-- Single Page Header End -->

  <!-- Cart Page Start -->
  <div class="container-fluid py-5">
    <div class="container py-5">
      <div class="table-responsive">
        <table class="table cart-list-table">
          <thead>
            <tr>
              <th><input type="checkbox" v-model="selectAll" /></th>
              <th scope="col">이미지</th>
              <th scope="col">상품명</th>
              <th scope="col">가격</th>
              <th scope="col">삭제</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(like, i) in likeList" :key="i">
              <td>
                <input type="checkbox" v-model="selectList" :value="like" />
              </td>
              <td>
                <img :src="getImgUrl(likeList[i].path)" width="120px" class="img-fluid rounded-top" alt="" /> <!--class의 imghw 지우고 크기 조절-->
              </td>
              <td>
                <p class="mb-0 mt-4">{{ like.product_name }}</p>
              </td>
              
              <td>
                <p class="mb-0 mt-4">
                  {{ $currencyFormat(like.product_price) }}원
                </p>
              </td>
              <td>
                <button @click="delCartOne(like)" class="btn btn-md rounded-circle bg-light border mt-4">
                  <i class="fa fa-times text-danger"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <br />

      <div class="button-center">
        <button @click="goToCart()"
          class="btn border-secondary rounded-pill px-4 py-3 text-primary text-uppercase mb-4 ms-4 ordBtn">
          장바구니 담기
        </button>
        <button @click="deleteSelected()"
          class="btn border-secondary rounded-pill px-4 py-3 text-primary text-uppercase mb-4 ms-4" type="button">
          찜 상품 비우기
        </button>
      </div>
      <p>{{ selectList }}</p>
    </div>
  </div>
  <!-- Cart Page End -->
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      likeList: [],
      selectList: [],
      mem_code: this.$store.state.memberStore.memberInfo.member_code,
      loginStatus: this.$store.state.memberStore.loginStatus,
    }
  },
  created() {
    this.getLikeList(this.mem_code);
  },
  computed: {
    // selectAll: {
    //   get: function () {
    //     //getter
    //     return this.likesList.length == this.selectList.length;
    //   },
    //   set(checked) {
    //     this.selectList = checked ? this.likesList : [];
    //   },
    // },
  },
  methods: {
    async getLikeList(mem_code) {
      let result = await axios
        .get('/apiorder/likes/' + mem_code)
        .catch((err) => console.log(err));
      console.log('result : ', result);
      let list = result.data;
      this.likeList = list;
    },
    getImgUrl(path) {
      if (path)
        return new URL(this.url + '/common/download?path=' + path);
      else
        return '';
    },
    // goToCart() {
    //   if (this.selectList.length == 0) {
    //     alert('주문하실 상품을 선택해주세요.');
    //   } else {
    //       sessionStorage.setItem("likes", JSON.stringify(this.selectList));
    //       this.$router.push({ path: '/cart' })
    //     }
    // }
  }
}
</script>
<style lang="">
  
</style>