<template>
  <!-- Single Page Header start -->
  <div class="container-fluid page-header py-5">
    <h3 class="text-center text-white">찜 상품</h3>
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

    async addToCart() { //찜 선택상품 -> 장바구니 담기
      if (this.selectList.length == 0) {
        alert('장바구니에 담을 상품을 선택해주세요.');
        return;
      }

      //장바구니 재고,중복체크
      for(let selLike of this.selectList) {
        if(selLike.stock_cnt < 1) {
          alert(selLike.product_name + '의 재고가 없습니다.\n해당 상품 선택을 취소 후 다시 담아주세요.');
          return;
        } else {
          console.log(selLike.product_code)
          let cartCheck = await axios.get(`/apiorder/carts/${this.mem_code}/${selLike.product_code}`).catch((err) => console.log(err));
          console.log('??', cartCheck); //PRO00084 Array나옴
          console.log('???', cartCheck.data.length); //1
            let proName = '';
            if(cartCheck.data.length == 1) {
              let proCode = cartCheck.data[0].product_code;
              if(selLike.product_code == proCode) {
                proName = selLike.product_name;
              }
              alert(proName + '는 이미 장바구니에 담긴 상품입니다.\n해당 상품 선택을 취소 후 다시 담아주세요.');
              return;
            }
        }
        let data = {
          "param": {
            cart_cnt: 1,
            member_code: this.mem_code,
            product_code: selLike.product_code
          }
        }
        console.log('selLike? ', selLike.product_code)
          let add = await axios.post("/apiorder/carts", data).catch(err => console.log(err));
              console.log('장바구니등록' + add);
      } //for문 끝
            alert('장바구니에 추가되었습니다.');
    },

    async delLikeOne(likeOne) { //단건삭제
      await axios
        .delete(`/apiorder/likes/${this.mem_code}/${likeOne.product_code}`)
        .catch((err) => console.log(err));
      this.$router.go(0);
    },
    async deleteSelected() { //선택상품들삭제
      if(this.selectList.length == 0) {
        alert('삭제할 상품을 선택해주세요.');
      } else {
        for (let selected of this.selectList) {
          await axios
            .delete(`/apiorder/likes/${this.mem_code}/${selected.product_code}`)
            .catch((err) => console.log(err));
        }
        alert('삭제되었습니다.');
        this.$router.go(0);
      }
    },
    gotodetail(pcode) {
      this.$router.push({ name: 'ProductInfo', query: { 'product_code': pcode } });
    },

  }//end method
}

</script>
<style scoped>
.button-center {
  text-align: center;
}
.text-primary {
  font-weight: bolder;
}
</style>