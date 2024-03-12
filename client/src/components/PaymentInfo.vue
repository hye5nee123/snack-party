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
          <td v-if="minus_point != 0">적립금 사용</td>

          <td v-if="pointInput == true">  
            <input type="text" v-model="usePoint" @input="point()" size=5>원 
            <button type="button" class="cnt-update-btn btn-sm" @click="usePoint = point_value">모두사용</button>
            <br>보유적립금: {{ $currencyFormat(point_value - usePoint) }}원
          </td>
          <td v-else-if="minus_point != 0 && pointInput == false">- {{ minus_point }}원</td>
        </tr>
        <tr>
          <td>배송비</td>
          <td>{{ $currencyFormat(deliveryFee) }}원</td>
        </tr>
        <tr>
          <td>최종결제 금액</td>
          <td v-if="pointInput == true">{{ $currencyFormat(totalPrice) }}원</td>
          <td v-else>{{ $currencyFormat(totalPrice - minus_point) }}원</td>
        </tr>
      </tbody>
    </table>

    <br>
    <div class="table-responsive">
      <table v-if="completepoint == true" class="table">
        <tbody>
          <tr>
            <td colspan="2"></td>
          </tr>
          <tr>
            <td style="width: 380.33px;">구매적립액</td>
            <td>{{ $currencyFormat(plus_point) }}원</td>
          </tr>
        </tbody>
      </table>
      <p v-else></p>
    </div>

    <br>
  </div>
</template>

<script>
export default {
  
  props: {
    checkOutList: Array,
    allPrice: Number,
    point_value: Number,
    pointList: Array,
    pointInput: Boolean,
    completepoint: Boolean,
  },
  emits: ['usePoint', 'deliveryFee'],

  data() {
    return {
      usePoint: 0,
      order_status: '',
    }
  },
  computed: {
    minus_point() { //사용적립액
      let point =0;
      if(this.pointList != null) {
        for(let i=0; i < this.pointList.length; i++) {
            if (this.pointList[i].point_status == 'd02' && this.pointList[i].review_code == null) {
              point =  this.pointList[i].point_value;
            }
        }
      } else {
        return;
      }
      return point
    },
    plus_point() { //구매적립액
      let point =0;
      if(this.pointList != null) {
        for(let i=0; i < this.pointList.length; i++) {
            if (this.pointList[i].point_status == 'd01' && this.pointList[i].review_code == null) {
              point =  this.pointList[i].point_value;
            } else {
                return
            }
        }
      } else {
        return;
      }
      return point
    },
    totalPrice() { //최종결제금액
      return this.allPrice - this.usePoint + this.deliveryFee;
    },
    deliveryFee() {
      return this.allPrice >= 30000 ? 0 : 3000;
    },
  },
  created() {
    this.$emit('deliveryFee', this.deliveryFee);
    this.orderStatus();
    console.log(this.plus_point)
  },

  updated() {
    this.$emit('usePoint', this.usePoint);
    this.$emit('totalPrice', this.totalPrice);
  },
  

  methods: {
    point() {
      if(this.usePoint > this.point_value || this.usePoint < 0) {
        alert('보유적립금을 확인해 주세요');
        this.usePoint = 0;
       }
    },
    orderStatus() {
      for(let status of this.checkOutList) {
        this.order_status = status.order_status;
      }
    }

  },


}
</script>

<style scoped>
.cnt-update-btn {
  background-color: #fff;
  border: 1px solid #93c5fff8;
  color: #7e7c7c;
  width: 80px;
}
.cnt-update-btn:hover {
  background-color:#93c5fff8;
  color: #fff;
  transition: 0.3s;
}
th {
  font-size: 16px;
}
</style>