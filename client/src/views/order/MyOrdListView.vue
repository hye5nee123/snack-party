<template>
  <!-- Single Page Header start -->
  <div class="container-fluid page-header py-5">
    <h1 class="text-center text-white display-6"></h1>
    <ol class="breadcrumb justify-content-center mb-0">
      <h4><li class="breadcrumb-item active text-white">MyOrder</li></h4>
    </ol>
  </div>
  <!-- Single Page Header End -->

  <!-- Cart Page Start -->
  <div class="container-fluid py-5">
    <div class="container py-5">
      <h4>주문내역</h4>
      <br>

      <div class="container" style="border: 1px solid #ccc; padding: 20px; border-radius: 20px; margin-bottom: 40px;">
        <p style="font-weight: bold; font-size: large;">공지</p>
        <p><span style="color: red; font-weight: bold;">* </span>주문상태가 '결제완료'인 경우에만 주문취소가 가능합니다</p>
        <p><span style="color: red; font-weight: bold;">* </span>배송완료 시 결제금액의 1%가 적립됩니다.</p>
        <p>모든 정보는 아래 상세조회 버튼 클릭 시 상세페이지에서 조회 가능합니다.</p>
      </div>
      <br>
      <br>
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">주문일</th>
              <th scope="col">주문번호</th>
              <th scope="col">상품명</th>
              <th scope="col">결제금액</th>
              <th scope="col">주문상태</th>
              <th scope="col">상세조회</th>
            </tr>
          </thead>
          <!-- {{ myOrdList }} -->
          <tbody>
            <tr v-for="(list, i) in myOrdList" :key="i">
              <td>{{ list.order_date }}</td>
              <td>{{ list.merchant_uid }}</td>
              <td v-if="list.buy_cnt == 0">{{ list.product_name }}</td>
              <td v-else>{{ list.product_name }} 외 {{ list.buy_cnt }}개</td>
              <td>{{ $currencyFormat(list.total_price) }}원</td>
              <td>{{ ordStatus(list.order_status) }}</td>
              <td><button type="button" class="cnt-update-btn btn btn-sm border-secondary rounded-pill px-2 py-2 text-primary ms-2" @click="goToDetail(list.order_code)">상세조회</button></td>
            </tr>
          </tbody>
        </table>
        <!-- 페이징 -->
        <PaginationComp :ITEM_PER_PAGE="ITEM_PER_PAGE" :PAGE_PER_SECTION="PAGE_PER_SECTION" :TOTAL_ARITCLES="TOTAL_ARITCLES"
            @change-page="onChangePage" style="margin-bottom: 50px;" />
      </div>
    </div>
  </div>

</template>

<script>
import axios from 'axios';
import PaginationComp from "../../components/PaginationComp.vue";

export default {
  data() {
    return {
      myOrdList: [],
      memCode: this.$store.state.memberStore.memberInfo.member_code,

      //페이징컴포넌트
      ITEM_PER_PAGE: 10,     // 한 페이지에 출력할 데이터 수
      PAGE_PER_SECTION: 5,  // 한번에 보여줄 페이지 버튼 수
      TOTAL_ARITCLES: 0,     // 전체 데이터 갯수

      curPage: 1,       // 현재 페이지
      pageData: 0,      // offset에 전달할 페이징 데이터
    };
  },
  components: {
    PaginationComp
  },
  created() {
    this.getMyOrdList();
    this.getListCount();
  },
  computed: {
    pageStartIdx() {
      return (this.curPage - 1) * this.ITEM_PER_PAGE;
    }
  },
  methods: {
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

    // 페이지네이션 컴포넌트에서 전달되는 emit event
    onChangePage(data) {
      this.curPage = data;
      this.pageData = (this.curPage - 1) * this.ITEM_PER_PAGE;
      this.getMyOrdList();
    },
    //주문목록
    async getMyOrdList() {
      let result = await axios.get(`/apiorder/myord/list/${this.memCode}/${this.ITEM_PER_PAGE}/${this.pageData}`)
        .catch(err => console.log(err));
      console.log('result : ', result)
      this.myOrdList = result.data;
    },
     // 전체 데이터 갯수
     async getListCount() {
      let result = await axios.get(`/apiorder/myord/count/${this.memCode}`)
        .catch(err => console.log(err));
      console.log('count : ', result.data[0].count)
      this.TOTAL_ARITCLES = result.data[0].count;
    },

    goToDetail(order_code){
      this.$router.push({path:'/myorderdetail', query:{order_code: order_code}});
    }
  },//end methods

}//END
</script>

<style scoped>
td {
  padding: 10px;
}
</style>