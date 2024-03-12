<template>
  <!-- Single Page Header start -->
  <div class="container-fluid page-header py-5">
    <h3 class="text-center text-white">주문상세</h3>
    <ol class="breadcrumb justify-content-center mb-0">
      <li class="breadcrumb-item"><a href="/productlist">Product</a></li>
      <li class="breadcrumb-item active text-white">MyOrder_detail</li>
    </ol>
  </div>
  <!-- Single Page Header End -->

  <div class="container-fluid py-5">
    <div class="container py-5">
      <h3>주문상세내역</h3>
      <br>

      <div class="right-div">
        <div class="col-md-12 col-lg-6 col-xl-7">
          <OrderProducts :checkOutList="myOrdDetail" />
        </div>
        <div class="table-responsive">
          <table class="table">
            <thead>
              <th style="font-size: 14px">주문상태</th>
              <th style="font-size: 14px; padding-left: 20px;">리뷰</th>
            </thead>
            <tbody>
              <tr v-for="(detail, i) in myOrdDetail" :key="i">
                <td class="py-5">{{ ordStatus(detail.order_status) }}</td>
                <td style="padding-top: 40px;">
                  <button type="button" class="btn btn-sm border-secondary rounded-pill px-3 py-2 text-primary ms-2"
                    v-on:click="goToReviewInsert(detail.detail_code)">리뷰작성</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <br>
      <br>

      <!-- 포인트?{{ use_point }} {{ plus_point }}
      주문금액?{{ allPrice }}
      {{ myOrdDetail }} -->
      <div class=" right-div">
        <div class="col-md-12 col-lg-6 col-xl-5">
          <PaymentInfo :checkOutList="myOrdDetail" :pointList="pointList" :allPrice="allProPrice" :completepoint="completepoint"
           @usePoint="usePoint" @deliveryFee="deliveryFee" @totalPrice="totalPrice"/>
        </div>
        <div class="col-md-12 col-lg-6 col-xl-5">
          <div class="table-responsive" style="margin-left: 70px;">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col" colspan="5" style="font-size: 16px">배송정보</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>운송장 번호 </td>
                  <td>{{ deliveryInfo.delivery_num }}</td>
                </tr>
                <tr>
                  <td>수령인 </td>
                  <td>{{ deliveryInfo.recipient }}</td>
                </tr>
                <tr>
                  <td>연락처 </td>
                  <td>{{ deliveryInfo.rec_phone }}</td>
                </tr>
                <tr>
                  <td rowspan="2">주소 </td>
                  <td>{{ deliveryInfo.rec_postcode }}</td>
                </tr>
                <tr>
                  <td>{{ deliveryInfo.rec_address }}{{ deliveryInfo.rec_address_detail }}</td>
                </tr>
                <tr>
                  <td v-if="deliveryInfo.rec_email != null">이메일 </td>
                  <td v-if="deliveryInfo.rec_email != null">{{ deliveryInfo.rec_email }}</td>
                </tr>
                <tr>
                  <td v-if="deliveryInfo.memo != null">배송메모 </td>
                  <td v-if="deliveryInfo.memo != null">{{ deliveryInfo.memo }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      <br />
      <div>
      </div>
    </div>
    <br>
    <div style="text-align: center;">
      <button @click="this.$router.push({ path: '/myorderlist' })" class="btn border-secondary rounded-pill px-4 py-2 text-primary text-uppercase mb-4 ms-4">주문목록 이동</button>
      <button @click="cancelOrd()" class="del-btn btn rounded-pill px-4 py-2 text-uppercase mb-4 ms-4">주문취소</button>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios';
import OrderProducts from '@/components/OrderProducts.vue';
import PaymentInfo from '@/components/PaymentInfo.vue';

export default {
  data() {
    return {
      myOrdDetail: [],
      order_code: '',
      merchant_uid: '',
      userInfo: {},
      mem_code: this.$store.state.memberStore.memberInfo.member_code,

      use_point: 0, //사용적립금
      delivery_fee: 0, //배송비
      total_price: 0, //최종결제금액

      pointInput: false,
      pointList: [],

      deliveryInfo: {},
      completepoint: true,
    }
  },
  components: {
    OrderProducts,
    PaymentInfo,
  },
  created() {
    this.order_code = this.$route.query.order_code;
    
    this.getMyOrdDetail(); //주문상세내역
    this.getPointInfo(); //포인트내역
    this.getDeliveryInfo(); //배송정보
    this.getMyOrdDetail()
  },
  computed: {
    allProPrice() {
      let allProPrice = 0;
      for (let pro of this.myOrdDetail) {
        allProPrice += pro.product_price * pro.cart_cnt;
      }
      return allProPrice;
    },
  },
  methods: {
    async getMyOrdDetail() {
      let result = await axios.get(`/apiorder/myord/details/${this.order_code}/${this.mem_code}`)
        .catch(err => console.log(err));
      console.log('result : ', result)
      this.myOrdDetail = this.changeField(result.data);
    },

    changeField(objList) {
      let newArr = [];
      for (let obj of objList) {
        newArr.push({
          detail_code: obj.detail_code,
          order_code: obj.order_code,
          product_price: obj.product_price,
          cart_cnt: obj.order_cnt,
          detail_price: obj.detail_price,
          product_name: obj.product_name,
          path: obj.path,
          order_status: obj.order_status
        });
      }
      return newArr;
    },

    async getPointInfo() { //주문 후 포인트내역
      let result = await axios.get(`/apiorder/myord/details/point/${this.order_code}/${this.mem_code}`)
        .catch(err => console.log(err));
      console.log('주문 후 포인트내역? detail : ', result);
      this.pointList = result.data;
    },

    async getDeliveryInfo() { //주문 후 배송
      let result = await axios.get(`/apiorder/myord/details/delivery/info/${this.order_code}`)
        .catch(err => console.log(err));
      console.log('주문 후 배송정보? ', result);
      let info = result.data;
      this.deliveryInfo = info;
    },

    ordStatus(status) {
      if (status == 'h01') {
        return '결제완료'
      } else if (status == 'h02') {
        return '주문취소'
      } else if (status == 'h03') {
        return '배송준비중'
      } else if (status == 'h04') {
        return '배송중'
      } else if (status == 'h05') {
        return '배송완료'
      } else if (status == 'h06') {
        return '반품취소'
      } else if (status == 'h07') {
        return '반품완료'
      } else {
        return '환불완료'
      }
    },

    async cancelOrd() {
      for (let i = 0; i < this.myOrdDetail.length; i++) {
        if (this.myOrdDetail[i].order_status == 'h01') {
          let result = await axios.put(`/apiorder/myord/cancel/${this.order_code}`)
            .catch((err) => console.log(err));
          let info = result.data.changedRows;
          if (info > 0) {
            alert('주문이 취소되었습니다.');
            this.$router.go(0);
          }
        } else if(this.myOrdDetail[i].order_status == 'h02') {
          alert('이미 주문취소된 상품입니다.')
        } else {
          alert('주문취소가 불가합니다.');
        }
      }
    },
    //리뷰 insert메소드 정의
    goToReviewInsert(detail_code) {
      this.$router.push({ path: '/reviewInsert', query: { 'detail_code': detail_code } });
    },

    //자식컴포넌트 데이터
    usePoint(data) {
      this.use_point = data;
    },
    deliveryFee(data) {
      this.delivery_fee = data;
    },
    totalPrice(data) {
      this.total_price = data;
    },
  }
}
</script>

<style scoped>
.col-xl-5 {
  width: 47%;
}

.col-xl-7 {
  width: 80%;
  justify-content: center;
}

.right-div {
  display: flex;
}

.table:not(.table-dark) th {
  color: #566a7f;
}

.table>:not(caption)>*>* {
  padding: 0.4rem 0.45rem;
  background-color: var(--bs-table-bg);
  border-bottom-width: 1px;
  box-shadow: inset 0 0 0 9999px var(--bs-table-accent-bg);
}

.table th {
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 1px;
  padding: 8px;
}

thead,
tbody,
tfoot,
tr,
td,
th {
  border-color: inherit;
  border-style: solid;
  border-width: 0;
}

.py-5 {
  padding-top: 3rem !important;
  padding-bottom: 3.2rem !important;
  /* 3 / 2.33 */
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
