<template>
  <!-- Single Page Header start -->
  <div class="container-fluid page-header py-5">
    <h3 class="text-center text-white">주문/결제</h3>
    <ol class="breadcrumb justify-content-center mb-0">
      <li class="breadcrumb-item"><a href="#">Home</a></li>
      <li class="breadcrumb-item"><a href="#">Pages</a></li>
      <li class="breadcrumb-item active text-white">Checkout</li>
    </ol>
  </div>
  <!-- Single Page Header End -->

  <!-- Checkout Page Start -->
  <div class="container-fluid py-5">
    <div class="container py-5">
      <h3 class="mb-4">주문/결제</h3>

      <!-- <form action="#"> -->
      <div class="row g-5">
        <!--주문정보-->
        <div class="col-md-12 col-lg-6 col-xl-7">
          <div class="form-item">
            <input
              type="radio"
              name="chk_info"
              checked
              class="radio-btn"
              @click="getUserInfo(this.member_code)"
            />
            <label class="form-label my-3" style="margin-right: 10px"
              >회원 정보와 동일</label
            >
            <input
              type="radio"
              name="chk_info"
              class="radio-btn"
              @click="newInfo()"
            />
            <label class="form-label my-3">새로운 배송지</label>
          </div>

          <div class="form-item">
            <label class="form-label my-3">받는사람 <sup class="red-star">*</sup></label>
            <input
              type="text"
              class="form-control"
              v-model="userInfo.member_name"
            />
          </div>

          <div class="form-item address-box">
            <label class="form-label my-3">주소 <sup class="red-star">*</sup></label>
            <br />

            <input
              type="text"
              width="100px"
              class="post-code-input"
              @input="deliveryInfo.rec_postcode = $event.target.value"
              v-model="userInfo.postcode"
            />
            <OpenPostcode v-on:postcode="getCode" />

            <input
              type="text"
              class="form-control"
              @input="deliveryInfo.rec_address = $event.target.value"
              v-model="userInfo.address"
            />
            <input
              type="text"
              class="form-control"
              @input="deliveryInfo.rec_address_detail = $event.target.value"
              v-model="userInfo.address_detail"
            />
          </div>
          <div class="form-item">
            <label class="form-label my-3">휴대전화 <sup class="red-star">*</sup></label>
            <input
              type="text"
              class="form-control"
              @input="deliveryInfo.rec_phone = $event.target.value"
              v-model="userInfo.member_phone"
              placeholder="010-0000-0000"
            />
          </div>
          <div class="form-item">
            <label class="form-label my-3">이메일 <sup class="red-star">*</sup></label>
            <input
              type="text"
              class="form-control"
              @input="userInfo.member_email = $event.target.value"
              v-model="userInfo.member_email"
              placeholder="snack-party@naver.com"
            />
          </div>
          <br />
          <div class="form-item">
            <label class="form-label my-3">배송메모</label>
            <textarea
              name="text"
              class="form-control"
              @input="deliveryInfo.memo = $event.target.value"
              spellcheck="false"
              cols="30"
              rows="5"
              placeholder="배송메모 입력 (선택사항)"
            ></textarea>
          </div>
        </div>
        <div class="col-md-12 col-lg-6 col-xl-5">
          <OrderProducts v-bind:checkOutList="checkOutList" />
          <br>
          <PaymentInfo
            v-bind:checkOutList="checkOutList"
            :point_value="userInfo.point_value"
            :pointInput="pointInput"
            :allPrice = "allPrice"
            @usePoint="usePoint"
            @deliveryFee="deliveryFee"
            @totalPrice="totalPrice"
          />

          <div class="row g-4 text-center align-items-center justify-content-center pt-4">
            <button type="button" @click="onPayment()" class="btn border-secondary py-3 px-4 text-uppercase w-100 text-primary">
              결제하기
            </button>
          </div>
        </div>
      </div>
      <!-- </form> -->
    </div>
  </div>
  <!-- Checkout Page End -->
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import OrderProducts from '@/components/OrderProducts.vue';
import PaymentInfo from '@/components/PaymentInfo.vue';
import OpenPostcode from '@/components/OpenPostcode.vue';

export default {
  data() {
    return {
      userInfo: {},
      userId: '',
      order_code: '',
      checkOutList: [],

      allPrice: 0, //주문상품금액
      use_point: 0, //사용적립금
      delivery_fee: 0, //배송비
      total_price: 0, //최종결제금액

      pointInput: true,

      //주문테이블
      get_point: 0,

      //배송
      deliveryInfo: {
        memo: null,
        delivery_num: null,
      },

      merchant_uid: '',

      member_code: this.$store.state.memberStore.memberInfo.member_code,
    };
  },
  components: {
    OrderProducts,
    PaymentInfo,
    OpenPostcode,
  },
  created() {
    this.checkOutList = JSON.parse(sessionStorage.getItem('carts'));
    this.getUserInfo(this.member_code);
    this.allProPrice();
  },

  methods: {
    async getUserInfo(mcode) {
      //회원기본정보
      let result = await axios
        .get('/apimember/' + mcode)
        .catch((err) => console.log(err));

      let info = result.data;
      this.userInfo = info;
      this.mcode = info.member_code;
    },

    newInfo() {
      //새로운 배송지
      this.userInfo.member_name = '';
      this.userInfo.member_phone = '';
      this.userInfo.postcode = '';
      this.userInfo.address = '';
      this.userInfo.address_detail = '';
    },

    getCode(zonecode, roadAddress) {
      //주소API
      this.userInfo.postcode = zonecode;
      this.userInfo.address = roadAddress;
    },

    allProPrice() {
      //총 상품금액
      let allProPrice = 0;
      for (let pro of this.checkOutList) {
        allProPrice += pro.product_price * pro.cart_cnt;
      }
      this.allPrice = allProPrice;
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

    //< 결제 API >
    onPayment() {
      /* 1. 가맹점 식별하기 */
      const { IMP } = window;
      IMP.init('imp42338080');

      /* 2. 결제 데이터 정의하기 */
      const data = {
        pg: 'html5_inicis', // PG사
        pay_method: 'card', // 결제수단
        merchant_uid: `snack_${new Date().getTime()}`, // 주문번호
        amount: this.total_price, // 결제금액
        name: '상품명', // 주문명
        buyer_name: this.userInfo.member_name, // 구매자 이름
        buyer_tel: this.userInfo.member_phone, // 구매자 전화번호
        buyer_email: this.userInfo.member_email, // 구매자 이메일
        buyer_postcode: this.userInfo.postcode, // 구매자 우편번호
        buyer_addr: this.userInfo.address + this.userInfo.address_detail, // 구매자 주소
      };

      const vue = this; //안에서 바깥 함수 호출하려고
      /* 4. 결제 창 호출하기 */
      IMP.request_pay(data, function (rsp) {
        // console.log('결제완료 전: ' + rsp);
        if (rsp.success) {
        //   var msg = '결제가 완료되었습니다.';
        //   alert(msg);

          vue.orderInsert(rsp); //주문,상세,배송 테이블 등록
          vue.changeInfo(rsp); //장바구니삭제, 재고량&회원포인트수정

          vue.merchant_uid = rsp.merchant_uid;
 
            Swal.fire({
                title: '주문이 완료되었습니다.',
                text: `주문번호: ${rsp.merchant_uid}`,
                icon: "success",
                showCancelButton: true,
                confirmButtonColor: "#6799FF",
                cancelButtonColor: "#FF8383",
                confirmButtonText: "쇼핑 계속하기",
                cancelButtonText: "주문내역 확인"
            }).then((result) => {
                    if (result.isConfirmed) {
                        vue.$router.push({path: '/productlist'});
                    } else {
                        vue.$router.push({path: '/myorderlist'});
                    }
                });
                
        } else {
            Swal.fire({
              icon: "error",
              title: "결제 실패",
              text: `오류 메세지: ${rsp.error_msg}`,
              });
        }
      });
    },

    //< 결제 후 >
    //1. orders / detail / delivery 테이블등록
    async orderInsert(rsp) {
      let data = {
        param: {
          order: {
            //주문
            member_code: this.userInfo.member_code,
            delivery_fee: this.delivery_fee,
            order_price: this.allPrice,
            use_point: this.use_point,
            total_price: this.total_price,
            get_point: this.get_point,
            order_status: 'h01', //결제완료
            cancel_date: null,
            imp_uid: rsp.imp_uid,
            merchant_uid: rsp.merchant_uid,
          },

          orderDetail: this.checkOutList, //주문상세

          deliveryInfo: {
            //배송
            recipient: this.userInfo.member_name,
            rec_phone: this.userInfo.member_phone,
            rec_postcode: this.userInfo.postcode,
            rec_address: this.userInfo.address,
            rec_address_detail: this.userInfo.address_detail,
            memo: this.deliveryInfo.memo,
            delivery_num: this.deliveryInfo.delivery_num,
          },

          point: {
            //포인트
            review_code: null,
            point_status: 'd02',
            point_value: this.use_point,
            member_code: this.member_code,
          },
        },
      };
      let result = await axios
        .post('/apiorder', data)
        .catch((err) => console.log(err));

      console.log('결제성공' + result);
    },

    //장바구니삭제
    async changeInfo() {
      for (let ordered of this.checkOutList) {
        await axios
          .delete(`/apiorder/carts/${ordered.cart_code}`)
          .catch((err) => console.log(err));
      }
      console.log('장바구니 삭제');
    },
  },
}; //end
</script>

<style scoped>
.address-box input {
  margin-top: 5px;
  margin-right: 10px;
  color: #747d88;
  padding: 0.375rem 0.75rem;
}

.post-code-input {
  border: 1px solid #ced4da;
  border-radius: 7px;
  padding: 5px;
}

.radio-btn {
  margin-right: 3px;
}
.red-star {
  color: red;
}
</style>
