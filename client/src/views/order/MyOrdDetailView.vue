<template>
  <!-- Single Page Header start -->
  <div class="container-fluid page-header py-5">
    <h1 class="text-center text-white display-6"></h1>
    <ol class="breadcrumb justify-content-center mb-0">
      <h4><li class="breadcrumb-item active text-white">MyOrder</li></h4>
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
              <th>주문상태</th>
              <th style="padding-left: 20px;">리뷰</th>
            </thead>
            <tbody>
              <tr v-for="(detail, i) in myOrdDetail" :key="i">
                <td class="py-5">{{ordStatus(detail.order_status)}}</td>
                <td class="py-5"><button type="button" class="btn btn-sm border-secondary rounded-pill px-2 py-2 text-primary ms-2">리뷰작성</button></td>
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
      <div class="right-div">
        <div class="col-md-12 col-lg-6 col-xl-5">
          <PaymentInfo :checkOutList="myOrdDetail" :pointList="pointList" :allPrice="allProPrice"
           @usePoint="usePoint" @deliveryFee="deliveryFee" @totalPrice="totalPrice"/>
        </div>
        <div class="col-md-12 col-lg-6 col-xl-5">
          <div class="table-responsive" style="margin-left: 70px;">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col" colspan="5">배송정보</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>운송장 번호 </td>
                  <td>{{ deliveryInfo.delivery_num }}</td>
                </tr>
                <tr>
                  <td>수령인 </td>
                  <td>{{deliveryInfo.recipient}}</td>
                </tr>
                <tr>
                  <td>연락처 </td>
                  <td>{{deliveryInfo.rec_phone}}</td>
                </tr>
                <tr>
                  <td rowspan="2">주소 </td>
                  <td>{{deliveryInfo.rec_postcode}}</td>
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
      </div>
    </div>
    
    <div style="text-align: center;">
      <button @click="cancelOrd()" class="btn border-secondary rounded-pill px-4 py-2 text-primary text-uppercase mb-4 ms-4">주문취소</button>
      <button @click="this.$router.push({ path: '/myorderlist' })" class="btn border-secondary rounded-pill px-4 py-2 text-primary text-uppercase mb-4 ms-4">주문목록 이동</button>
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
      userInfo: {},
      mem_code: this.$store.state.memberStore.memberInfo.member_code,

      use_point: 0, //사용적립금
      delivery_fee: 0, //배송비
      total_price: 0, //최종결제금액

      pointInput: false,
      pointList: [],

      deliveryInfo: {},
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
    this.getPoint(); //배송완료 시 포인트 적립?
  },
  // updated() {
  //   this.getPoint(); //배송완료 시 포인트 적립?
  // },
  watch:{

  },
  computed: {
    allProPrice() {
      let allProPrice = 0;
      for(let pro of this.myOrdDetail) {
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
      for(let i=0; i < this.myOrdDetail.length; i++) {
        if(this.myOrdDetail[i].order_status == 'h01') {
          let result = await axios.put(`/apiorder/myord/cancel/${this.order_code}`)
                        .catch((err) => console.log(err));
          let info = result.data.changedRows;
          if(info > 0) {
            alert('주문이 취소되었습니다.');
            this.$router.go(0);
          }
        } else {
          alert('주문취소가 불가합니다.');
        }
      }
    },

    //안 됨
    async getPoint() { //배송완료 시 포인트 추가(리뷰작성 시 포인트 추가도 해야 됨
      for(let i=0; i < this.myOrdDetail.length; i++) {
        if(this.myOrdDetail[i].order_status == 'h05') {
          let data = {
            "param": {
              order_code: this.order_code,
              review_code: null,
              point_status: 'd01', //적립
              point_value: Math.round(this.total_price * 0.01),
              member_code: this.mem_code
            }
          }
          await axios.post('/apiorder/myord/pointplus', data).catch(err => console.log(err));
        }
      }
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
    /* flex: 0 0 auto; */
    width: 47%;
}
.col-xl-7 {
    /* flex: 0 0 auto; */
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
thead, tbody, tfoot, tr, td, th {
    border-color: inherit;
    border-style: solid;
    border-width: 0;
}
.py-5 {
    padding-top: 3rem !important;
    padding-bottom: 2.33rem !important;
}

</style>
