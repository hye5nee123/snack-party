<template>
  <div class="table-responsive">
    <table class="table">
      <thead>
        <tr>
          <th scope="col" colspan="5">결제정보</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>주문상품 금액</td>
          <td>{{ allProPrice() }}원</td>
        </tr>
        <tr>
          <td>적립금</td>

          <td><input type="text" v-model="use_point">원 <button type="button" @click="use_point = point_value">모두사용</button>
            <br>보유적립금: {{ point_value }}원</td>
        </tr>
        <tr>
          <td>배송비</td>
          <td>{{ deliveryFee }}원</td>
        </tr>
        <tr>
          <td>총 결제 금액</td>
          <td>{{ total() }}원</td>
        </tr>
      </tbody>
    </table>
    <br />
  </div>
</template>

<script>
export default {
  props: {
    checkOutList: Array,
    point_value: Number,
  },
  data() {
    return {
      allPrice: 0,
      totalPrice: 0,
      use_point: 0,
    }
  },


  methods: {
    allProPrice() { //총 상품금액
      let allProPrice = 0;
      for (let pro of this.checkOutList) {
          allProPrice += pro.product_price * pro.cart_cnt;
      }
      return (this.allPrice = allProPrice);
    },
    total() { //최종결제금액
      return this.totalPrice = this.allPrice - this.use_point + this.deliveryFee; 
    }
    
    
  },

  computed: {
    deliveryFee() {
      return this.allPrice >= 30000 ? 0 : 3000;
    },
  }

}
</script>

<style scoped>

</style>

