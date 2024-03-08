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
          <td>{{ $currencyFormat(allPrice) }}원</td>
        </tr>
        <tr>
          <td>적립금</td>

          <td>
            <!-- <input type="text" v-model="usePoint" @input="usePoint = $event.target.value">원  -->
            <input type="text" v-model="usePoint" @input="point()">원 
            <button type="button" @click="usePoint = point_value">모두사용</button>
            <br>보유적립금: {{ $currencyFormat(point_value - usePoint) }}원
          </td>
        </tr>
        <tr>
          <td>배송비</td>
          <td>{{ $currencyFormat(deliveryFee) }}원</td>
        </tr>
        <tr>
          <td>최종결제 금액</td>
          <td>{{ $currencyFormat(totalPrice) }}원</td>
        </tr>
      </tbody>
    </table>
    <br />
  </div>
</template>

<script>
export default {
  emits: ['allPrice', 'usePoint', 'deliveryFee'],

  props: {
    checkOutList: Array,
    point_value: Number,
  },

  data() {
    return {
      allPrice: 0,
      totalPrice: 0,
      usePoint: 0,
      deliveryFee: 0,
    }
  },

  mounted() {
    this.allProPrice()
    this.delivery()
    this.$emit('allPrice', this.allPrice);
    this.$emit('deliveryFee', this.deliveryFee);
  },

  updated() {
    this.total()
    this.$emit('usePoint', this.usePoint);
    this.$emit('totalPrice', this.totalPrice);
  },
  

  methods: {
    allProPrice() { //총 상품금액
      let allProPrice = 0;
      for (let pro of this.checkOutList) {
        allProPrice += pro.product_price * pro.cart_cnt;
      }
     this.allPrice = allProPrice;
    },
    total() { //최종결제금액
      this.totalPrice = this.allPrice - this.usePoint + this.deliveryFee;
    },
    delivery() {
      this.deliveryFee = this.allPrice >= 30000 ? 0 : 3000;
    },

    point() {
      if(this.usePoint >= this.point_value || this.usePoint < 0) {
        alert('보유적립금을 확인해 주세요');
        this.usePoint = 0;
       }
    }
  },


}
</script>

<style scoped></style>