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
      <p>{{ order_code }}</p>
      {{ mem_code }}
      <OrderProducts :checkOutList="myOrdDetail" />

      <br />
      <div>
        {{ myOrdDetail }}
        <PaymentInfo />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import OrderProducts from '@/components/OrderProducts.vue';
// import PaymentInfo from '@/components/PaymentInfo.vue';

export default {
  data() {
    return {
      myOrdDetail: [],
      order_code: '',
      mem_code: this.$store.state.memberStore.memberInfo.member_code,
    }
  },
  components: {
    OrderProducts,
    // PaymentInfo,
  },
  created() {
    this.order_code = this.$route.query.order_code;
    this.getMyOrdDetail()
  },
  methods: {

    // async getMyOrdDetail() {
    //   let result = await axios.get(`/apiorder/myord/details/${this.order_code}/${this.mem_code}`)
    //     .catch(err => console.log(err));
    //   console.log('result : ', result)
    //   this.myOrdDetail = result.data;
    // },

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
    }
  }
}
</script>
