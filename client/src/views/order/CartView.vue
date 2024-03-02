<template>
  <!-- Single Page Header start -->
  <div class="container-fluid page-header py-5">
  <h1 class="text-center text-white display-6">장바구니</h1>
  <ol class="breadcrumb justify-content-center mb-0">
      <li class="breadcrumb-item"><a href="/productlist">Product</a></li>
      <!-- <li class="breadcrumb-item"><a href="#">Pages</a></li> -->
      <li class="breadcrumb-item active text-white">Cart</li>
  </ol>
</div>
<!-- Single Page Header End -->


<!-- Cart Page Start -->
<div class="container-fluid py-5">
  <div class="container py-5">
      <div class="table-responsive">
          <table class="table table-center">
              <thead class="text-center">
                <tr>
                  <th><input type="checkbox"></th>
                  <th scope="col">이미지</th>
                  <th scope="col">상품명</th>
                  <th scope="col" colspan="2">수량</th>
                  <th scope="col">가격</th>
                  <th scope="col">삭제</th>
                </tr>
              </thead>
              <tbody>
                  <tr v-for="(cart, i) in cartList" :key="i">
                      <td><input type="checkbox"></td>
                      <td><img src="../../assets/apple.jpg" width="100px"></td>
                      <td>{{ cart.product_name }}</td>
                      <td>
                          <div class="input-group quantity mt-4" style="width: 100px;">
                              <div class="input-group-btn">
                                  <button class="btn btn-sm btn-minus rounded-circle bg-light border" @click="cart.cart_cnt--">
                                  <i class="fa fa-minus"></i>
                                  </button>
                              </div>
                              <input type="text" style="background: #fff" class="form-control form-control-sm text-center border-0" min="1" v-model="cart.cart_cnt" readonly>
                              <div class="input-group-btn">
                                  <button class="btn btn-sm btn-plus rounded-circle bg-light border" @click="cart.cart_cnt++">
                                      <i class="fa fa-plus"></i>
                                  </button>
                              </div>
                          </div>
                        </td>
                        <td><button @click="updateCnt(cart)">변경</button></td>
                      <td>
                          <p class="mb-0 mt-4">{{ cart.cart_cnt * cart.product_price}}원</p>
                      </td>
                      <td>
                          <!-- <button class="btn btn-md rounded-circle bg-light border mt-4" >
                              <i class="fa fa-times text-danger"></i>
                          </button> -->
                          <button @click="delCartOne(cart)" >삭제</button>
                      </td>
                  </tr>
              </tbody>
          </table>
      </div>
      <br>
      <div class="container-fluid py-5">
          <table id="total" class="table">
              <tr>
                  <th>총 상품금액</th>
                  <th>배송비</th>
                  <th>결제예정금액</th>
              </tr>
              <tr>
                  <td>{{ allProPrice() }}원</td>
                  <td v-if="allProPrice() >= 30000">+ {{delieveryFee=0}}원</td>
                  <td v-else>+ {{ delieveryFee }}원</td>
                  <td>= {{ allProPrice() + delieveryFee }}원</td>
              </tr>
          </table>
      </div>
      <div class="container-center">
          <button class="btn border-secondary rounded-pill px-4 py-3 text-primary text-uppercase mb-4 ms-4 ordBtn" type="button">주문하기</button>
          <button class="btn border-secondary rounded-pill px-4 py-3 text-primary text-uppercase mb-4 ms-4" type="button">장바구니 비우기</button>
      </div>
  </div>
</div>
<!-- Cart Page End -->
</template>
<script>
import axios from 'axios'

export default {
  data() {
  return {
  cartList: [],
  delieveryFee: 3000,
  }
  },
  created() {
  // let searchNo = this.$route.query.userId;
  this.getCartList('user001');
  },
  computed: {

  },
  methods: {
    async getCartList(userId) {
    let result = await axios.get('/apiorder/carts/'+ userId)
                    .catch(err => console.log(err));
    let list = result.data;
    this.cartList = list;                    
    },

    async updateCnt(cart) { //수량
      await axios.put(`/apiorder/carts/${cart.cart_cnt}/${cart.cart_code}`)
            .catch(err => console.log(err));                  
    },

    allProPrice() { //총 상품금액
    let allProPrice = 0;
    for (let pro of this.cartList) {
      allProPrice += pro.product_price * pro.cart_cnt;
    }
    return allProPrice;
    },

    async delCartOne(cartOne) {
      await axios.delete(`/apiorder/carts/${cartOne}`)
      .catch(err => console.log(err));  
    }

  }
}
</script>

<!-- <style scoped> -->
<style>
.table-center > tr{
text-item: center
}
#total tr,td {
border: 1px solid #eee;
padding: 35px;
text-align: center;
font-size: 18px

}
#total th {
padding: 20px
}
.container-center {
text-align: center
}

</style>
