<template>
  <div class="container-xxl flex-grow-1 container-p-y">
    <div class="card">
      <!-- Cart Page Start -->
      <div class="card-header">
        <h5 class="card-title">검색조건</h5>

        <table class="table">

          <!-- 기간 -->
          <tr>
            <td>기간</td>
            <td>
              <div class="input-group w-300">
                <input class="form-control w-150 inbl" type="date" aria-label="default input example"
                  v-model="start_date">
                <span style="margin: 0 5px;">~</span>
                <input class="form-control w-150 inbl" type="date" aria-label="default input example"
                  v-model="end_date">
              </div>
              <div class="inbl">
                <button class="btn btn-outline-dark" @click="getOneMonth">1개월</button>
                <button class="btn btn-outline-dark mgrl" @click="getSixMonth">6개월</button>
                <button class="btn btn-outline-dark" @click="getOneYear">12개월</button>
              </div>
            </td>
          </tr>

          <!-- 주문 코드 -->
          <tr>
            <td>주문코드</td>
            <td>
              <div class="input-group w-300">
                <input type="text" class="form-control" placeholder="주문코드를 입력하세요." aria-describedby="search-icon-1"
                  v-model="order_code">
              </div>
            </td>
          </tr>

          <!-- 주문자 -->
          <tr>
            <td>주문자코드</td>
            <td>
              <div class="input-group w-300">
                <input type="text" class="form-control" placeholder="주문자 코드를 입력하세요." aria-describedby="search-icon-1"
                  v-model="member_code">
              </div>
            </td>
          </tr>

          <!-- 상품명 -->
          <tr>
            <td>상품명</td>
            <td>
              <div class="input-group w-300">
                <input type="text" class="form-control" placeholder="상품명을 입력하세요." aria-describedby="search-icon-1"
                  v-model="product_name">
              </div>
            </td>
          </tr>

          <!-- 주문 상태 -->
          <tr>
            <td>주문상태</td>
            <td>
              <div class="input-group w-300">
                <select id="ProductCategory" class="form-select text-capitalize w-150" v-model="order_status">
                  <option value="">전체 카테고리</option>
                  <option value="h01">결제완료</option>
                  <option value="h02">주문취소</option>
                  <option value="h03">배송준비중</option>
                  <option value="h04">배송중</option>
                  <option value="h05">배송완료</option>
                  <option value="h06">반품취소</option>
                  <option value="h07">반품완료</option>
                  <option value="h08">환불완료</option>
                </select>
              </div>
            </td>
            <td>
              <button class="btn-search btn border border-secondary btn-md-square rounded-circle bg-white me-4"
                @click="seacrhOrder()">
                <i class="fas fa-search text-primary" aria-hidden="true"></i>
              </button>
              <button class="btn border border-secondary rounded-pill px-3 text-primary" @click="clearSearch()">
                초기화</button>
            </td>
          </tr>

        </table>
      </div>
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">No.</th>
              <th scope="col">주문일</th>
              <th scope="col">주문번호</th>
              <th scope="col">주문자</th>
              <th scope="col">상품명</th>
              <th scope="col">결제금액</th>
              <th scope="col">주문상태</th>
              <th scope="col">상세조회</th>
            </tr>
          </thead>

          <!-- {{ orderList }} -->
          <tbody>
            <tr v-for="(list, i) in orderList" :key="i">
              <td>{{ list.num }}</td>
              <td>{{ list.order_date }}</td>
              <td>{{ list.order_code }}</td>
              <td>{{ list.member_code }}</td>
              <td v-if="list.buy_cnt == 0">{{ list.product_name }}</td>
              <td v-else>{{ list.product_name }} 외 {{ list.buy_cnt }}개</td>
              <td>{{ $currencyFormat(list.total_price) }}원</td>
              <td>{{ ordStatus(list.order_status) }}</td>
              <td><button type="button" class="cnt-update-btn btn-sm detail-btn" :orderList="list"
                  @click="goToDetail(list.order_code, list.member_code)">상세조회</button></td>
            </tr>
          </tbody>
        </table>

        <!-- 페이징 -->
        <PaginationComp :ITEM_PER_PAGE="ITEM_PER_PAGE" :PAGE_PER_SECTION="PAGE_PER_SECTION"
          :TOTAL_ARITCLES="TOTAL_ARITCLES" @change-page="onChangePage" style="margin-bottom: 50px;" />

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
      orderList: [],
      detailList: [],
      start_date: '',
      end_date: '',
      order_code: '',
      member_code: '',
      product_name: '',
      order_status: '',

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
    this.getOrderList();
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
      this.getOrderList();
    },

    //주문목록
    async getOrderList() {
      let param = '';
      param = `?start_date=${this.start_date}&end_date=${this.end_date}&order_code=${this.order_code}`
      param += `&member_code=${this.member_code}&product_name=${this.product_name}&order_status=${this.order_status}&offset=${this.pageData}`;

      let result = await axios.get(`/api/admin/orderlist${param}`)
        .catch(err => console.log(err));
      console.log(result)
      this.orderList = result.data;
    },

    // 전체 데이터 갯수
    async getListCount() {
      let param = '';
      param = `?start_date=${this.start_date}&end_date=${this.end_date}&order_code=${this.order_code}`
      param += `&member_code=${this.member_code}&product_name=${this.product_name}&order_status=${this.order_status}`;

      console.log('param : ', param)
      let result = await axios.get(`/api/admin/ordercnt${param}`)
        .catch(err => console.log(err));
      console.log('result.data[0].count : ', result.data[0].count)
      this.TOTAL_ARITCLES = result.data[0].count;
    },

    async goToDetail(order_code, member_code) {
      this.$router.push({ path: '/admin/order/orderdetail', query: { order_code: order_code, member_code: member_code } });
    },

    seacrhOrder() {
      this.getOrderList();
      this.getListCount();
    },

    clearSearch() {
      console.log('clearSearch()')
      this.start_date = '';
      this.end_date = '';
      this.merchant_uid = '';
      this.member_code = '';
      this.product_name = '';
      this.order_status = '';
    },
    // 기간 자동 설정
    getOneMonth() {
      let today = new Date();
      this.end_date = this.$formatDate(today);

      let oneMonthAgo = new Date(today.setMonth(today.getMonth() - 1));
      this.start_date = this.$formatDate(oneMonthAgo);
    },
    getSixMonth() {
      let today = new Date();
      this.end_date = this.$formatDate(today);

      let sixMonthAgo = new Date(today.setMonth(today.getMonth() - 6));
      this.start_date = this.$formatDate(sixMonthAgo);
    },
    getOneYear() {
      let today = new Date();
      this.end_date = this.$formatDate(today);

      let oneYearAgo = new Date(today.setMonth(today.getMonth() - 1));
      this.start_date = this.$formatDate(oneYearAgo);
    },

    formatDate(dateString) {
      const date = new Date(dateString);
      const year = date.getFullYear();
      let month = (1 + date.getMonth()).toString().padStart(2, '0');
      let day = date.getDate().toString().padStart(2, '0');

      return `${year}-${month}-${day}`;
    },
  },//end methods


}//END
</script>
