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
                <img :src="getImgUrl(likeList[i].path)" width="120px" class="img-fluid rounded-top" @click="gotodetail(likeList[i].product_code)" /> <!--class의 imghw 지우고 크기 조절-->
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
                <button @click="delLikeOne(like)" class="btn btn-md rounded-circle bg-light border mt-4">
                  <i class="fa fa-times text-danger"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <br />

      <div class="button-center">
        <button @click="addToCart()"
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
    selectAll: {
      get: function () {
        //getter
        return this.likeList.length == this.selectList.length;
      },
      set(checked) {
        this.selectList = checked ? this.likeList : [];
      },
    },
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
    async addToCart() {
      if (this.selectList.length == 0) {
        alert('장바구니에 담을 상품을 선택해주세요.');
        return;
      }

      let data = {
        "param": {
          cart_cnt: 1,
          member_code: this.mem_code,
          product_code: this.selectList.product_code
        }
      }

      // let cartCheck = await axios.get(`/apiorder/carts/${this.mem_code}/${this.selectList.product_code}`).catch((err) => console.log(err));
     
      for(let selOrd of this.selectList) {
        if(selOrd.stock_cnt < 1){
          alert(selOrd.product_name + '의 재고량이 부족하여 장바구니에 담을 수 없습니다.');
          return;
        } 
      }
        let add = await axios.post("/apiorder/carts", data).catch(err => console.log(err));
            console.log('장바구니등록' + add);
            alert('장바구니에 추가되었습니다.');
            // this.$router.push({ path: '/cart' });
      },
      async delLikeOne(likeOne) { //단건삭제
      await axios
        .delete(`/apiorder/likes/${likeOne.product_code}`)
        .catch((err) => console.log(err));
      this.$router.go(0);
    },
    gotodetail(pcode) {
      this.$router.push({ name: 'ProductInfo', query: { 'product_code': pcode } });
    },

  }//end method
}

</script>
<style lang="">
  
</style>