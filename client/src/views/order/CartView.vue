<template>
  <!-- Single Page Header start -->
  <div class="container-fluid page-header py-5">
    <h3 class="text-center text-white">장바구니</h3>
    <ol class="breadcrumb justify-content-center mb-0">
      <li class="breadcrumb-item"><a href="/productlist">Product</a></li>\
      <li class="breadcrumb-item active text-white">Cart</li>
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
              <th scope="col">수량</th>
              <th scope="col">가격</th>
              <th scope="col">삭제</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(cart, i) in cartList" :key="i">
              <td>
                <input type="checkbox" v-model="selectList" :value="cart" />
              </td>
              <td>
                <img :src="getImgUrl(cartList[i].path)" width="120px" class="img-fluid rounded-top" 
                  @click="gotodetail(cartList[i].product_code)"/>
              </td>
              <td>
                <p class="mb-0 mt-4">{{ cart.product_name }}</p>
              </td>
              <td>
                <!-- 수량START -->
                <div class="input-group quantity mt-4" style="width: 150px">
                  <div class="input-group-btn">
                    <button class="btn btn-sm btn-minus rounded-circle bg-light border" 
                      @click="cart.cart_cnt <= 1 ? cart.cart_cnt : cart.cart_cnt--">
                      <i class="fa fa-minus"></i>
                    </button>
                  </div>
                  <input type="text" style="background: #fff" class="form-control form-control-sm text-center border-0" 
                         min="1" v-model="cart.cart_cnt" v-bind:disabled="cart.stock_cnt == 0"/>
                  <div class="input-group-btn">
                      <button class="btn btn-sm btn-plus rounded-circle bg-light border" 
                        @click="cart.cart_cnt++" v-bind:disabled="cart.stock_cnt == 0">
                      <i class="fa fa-plus"></i>
                    </button>
                  </div>
                  <div style="padding-left: 10px;">
                    <button type="button" class="cnt-update-btn btn-sm" @click="updateCnt(cart)">변경</button>
                  </div>
                </div>
                <!-- 수량END -->
              </td>
              <td>
                <p class="mb-0 mt-4">
                  {{ $currencyFormat(cart.cart_cnt * cart.product_price) }}원
                </p>
              </td>
              <td>
                <button @click="delCartOne(cart)" class="btn btn-md rounded-circle bg-light border mt-4">
                  <i class="fa fa-times text-danger"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <br />
      <div class="container-fluid py-5">
        <table id="total" class="table">
          <tr>
            <th>총 상품금액</th>
            <th>배송비</th>
            <th>결제예정금액</th>
          </tr>
          <tr>
            <td>{{ $currencyFormat(allProPrice()) }}원</td>
            <td>+ {{ $currencyFormat(deliveryFee) }}원</td>
            <td>= {{ $currencyFormat(allProPrice() + deliveryFee) }}원</td>
          </tr>
        </table>
      </div>
      <div class="button-center">
        <button type="button" @click="goToCheckOut()" class="btn border-secondary rounded-pill px-4 py-3 text-primary text-uppercase mb-4 ms-4">
          선택상품 주문하기
        </button>
        <button type="button" @click="deleteSelected()" class="btn del-btn rounded-pill px-4 py-3 text-uppercase mb-4 ms-4">
          장바구니 비우기
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
      cartList: [],
      totalPrice: 0,
      selectList: [],
      disabled: false,
      memId: this.$store.state.memberStore.memberInfo.member_id,
      loginStatus: this.$store.state.memberStore.loginStatus,
    };
  },

  created() {
    this.getCartList(this.memId);
  },

  computed: {
    deliveryFee() {
      return this.totalPrice >= 30000 ? 0 : 3000;
    },

    selectAll: {
      get: function () {
        //getter
        return this.cartList.length == this.selectList.length;
      },
      set(checked) {
        this.selectList = checked ? this.cartList : [];
      }
    },
  },

  methods: {
    async getCartList(userId) {
      let result = await axios
        .get('/apiorder/carts/' + userId)
        .catch((err) => console.log(err));
      console.log('result : ', result);
      let list = result.data;
      this.cartList = list;
    },
    getImgUrl(path) {
      if (path)
        return new URL(this.url + '/common/download?path=' + path);
      else
        return '';
    },

    async updateCnt(cart) {
      //수량
      if (cart.stock_cnt >= cart.cart_cnt) {
        let result = await axios
          .put(`/apiorder/carts/${cart.cart_cnt}/${cart.cart_code}`)
          .catch((err) => console.log(err));
        let info = result.data.changedRows;
        if (info > 0) {
          alert('수정되었습니다.');
        }
      } else if (cart.stock_cnt == 0) {
        alert('품절된 상품으로 주문이 불가합니다.');
        cart.cart_cnt = cart.stock_cnt;
      } else {
          alert(cart.product_name + '의 재고량이 부족합니다. 주문가능한 수량은 ' + cart.stock_cnt + '개 입니다.');
          cart.cart_cnt = cart.stock_cnt;
      }
    },

    allProPrice() { //총 상품금액
      let allProPrice = 0;
      for (let pro of this.selectList) {
        allProPrice += pro.product_price * pro.cart_cnt;
      }
      return (this.totalPrice = allProPrice);
    },

    async delCartOne(cartOne) { //단건삭제
      await axios
        .delete(`/apiorder/carts/${cartOne.cart_code}`)
        .catch((err) => console.log(err));
      this.$router.go(0);
    },

    async deleteSelected() { //선택삭제
      if(this.selectList.length == 0) {
        alert('삭제할 상품을 선택해주세요.');
      } else {
        for (let selected of this.selectList) {
          await axios
            .delete(`/apiorder/carts/${selected.cart_code}`)
            .catch((err) => console.log(err));
        }
        alert('삭제되었습니다.');
        this.$router.go(0); //페이지새로고침
      }
    },

    goToCheckOut() { //주문하기로 이동
      if (this.selectList.length == 0) {
        alert('주문하실 상품을 선택해주세요.');
      } 
      for(let selOrd of this.selectList) {
        if(selOrd.stock_cnt < selOrd.cart_cnt){
          alert(selOrd.product_name + '의 재고량이 부족합니다.\n주문가능한 수량은 ' + selOrd.stock_cnt + '개로 수량이 변경됩니다.');
          selOrd.cart_cnt = selOrd.stock_cnt;
        } else {
          sessionStorage.setItem("carts", JSON.stringify(this.selectList))
          this.$router.push({ path: '/checkout' })
        }
      }
    },

    gotodetail(pcode) {
      this.$router.push({ name: 'ProductInfo', query: { 'product_code': pcode } });
    },
  },
}; //end
</script>

<style scoped>
.cart-list-table th,
td {
  font-size: 15px;
}
#total {
  border: 1px solid #ccc;
}
#total th {
  text-align: center;
  padding: 20px;
  font-size: 16px;
}
#total td {
  text-align: center;
  padding: 35px;
  font-size: 19px;
}
.button-center {
  text-align: center;
}
.cnt-update-btn {
  background-color: #fff;
  border: 1px solid #93c5fff8;
  color: #7e7c7c;
  font-weight: bold;
  width: 50px;
}
.cnt-update-btn:hover {
  background-color:#93c5fff8;
  color: #fff;
  transition: 0.3s;
}
.text-primary {
  font-weight: bolder;
}
.del-btn {
  border: 1px solid #ee9d9d;
  color: #ee9d9d;
  font-weight: 600;
}
.del-btn:hover {
  background-color:#f78c8c;
  color: #fff;
  transition: 0.7s;
}
</style>
