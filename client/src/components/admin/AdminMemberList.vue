<template>
    <div class="container-xxl flex-grow-1 container-p-y">
      <div class="card">
        <!-- Cart Page Start -->
        <div class="card-header">
          <h5 class="card-title">검색조건</h5>
  
          <table class="table">
  
            <!-- 주문 코드 -->
            <tr>
              <td>회원검색</td>
              <td>
                <div class="input-group w-300">
                  <input type="text" class="form-control" placeholder="회원코드/아이디/이름 입력" aria-describedby="search-icon-1"
                    v-model="merchant_uid">
                </div>
              </td>
            </tr>

            <!-- 라디오버튼 -->
        <tr>
          <td>회원구분</td>
          <td>
            <div class="form-check form-check-inline" style="margin-left: 25px;">
              <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value=""
                v-model="display">
              <label class="form-check-label" for="inlineRadio1">전체</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="f01"
                v-model="display">
              <label class="form-check-label" for="inlineRadio1">일반회원</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="f02"
                v-model="display">
              <label class="form-check-label" for="inlineRadio2">소셜회원</label>
            </div>
          </td>
        </tr>

                    <!-- 라디오버튼 -->
                    <tr>
          <td>계정상태</td>
          <td>
            <div class="form-check form-check-inline" style="margin-left: 25px;">
              <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value=""
                v-model="display">
              <label class="form-check-label" for="inlineRadio1">전체</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="f01"
                v-model="display">
              <label class="form-check-label" for="inlineRadio1">활성계정</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="f02"
                v-model="display">
              <label class="form-check-label" for="inlineRadio2">탈퇴계정</label>
            </div>
          </td>
        </tr>




  

  

  
            <!-- 주문 상태 -->
            <!-- <tr>
              <td>주문상태</td>
              <td>
                <button class="btn-search btn border border-secondary btn-md-square rounded-circle bg-white me-4"
                  @click="searchOrder()">
                  <i class="fas fa-search text-primary" aria-hidden="true"></i>
                </button>
                <button class="btn border border-secondary rounded-pill px-3 text-primary" @click="clearSearch()">
                  초기화</button>
              </td>
            </tr> -->
  
          </table>
        </div>
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">번호</th>
                <th scope="col">회원코드</th>
                <th scope="col">아이디</th>
                <th scope="col">이름</th>
                <th scope="col">회원구분</th>
                <th scope="col">회원상태</th>
                <th scope="col">가입일자</th>
                <th scope="col">탈퇴일자</th>
              </tr>
            </thead>
  
            <!-- {{ orderList }} -->
            <tbody>
              <tr v-for="(list, i) in orderList" :key="i">
                <td>{{ list.num }}</td>
                <td>{{ list.order_date }}</td>
                <td>{{ list.merchant_uid }}</td>
                <td>{{ list.member_code }}</td>
                <td v-if="list.buy_cnt == 0">{{ list.product_name }}</td>
                <td v-else>{{ list.product_name }} 외 {{ list.buy_cnt }}개</td>
                <td>{{ $currencyFormat(list.total_price) }}원</td>
                <td>{{ ordStatus(list.order_status) }}</td>
                <td><button type="button" class="cnt-update-btn btn-sm detail-btn" :orderList="list"
                    @click="goToDetail(list.merchant_uid, list.member_code, list.order_code)">상세조회</button></td>
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
        merchant_uid: '',
        member_code: '',
        product_name: '',
        order_status: '',
  
        //페이징컴포넌트
        ITEM_PER_PAGE: 10,     // 한 페이지에 출력할 데이터 수
        PAGE_PER_SECTION: 5,  // 한번에 보여줄 페이지 버튼 수
        TOTAL_ARITCLES: 0,     // 전체 데이터 갯수
  
        curPage: 1,       // 현재 페이지
        pageData: 0,      // offset에 전달할 페이징 데이터

        keyword : '',
        type : '',
        status : ''
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
        param = `?start_date=${this.start_date}&end_date=${this.end_date}&merchant_uid=${this.merchant_uid}`
        param += `&member_code=${this.member_code}&product_name=${this.product_name}&order_status=${this.order_status}&offset=${this.pageData}`;
  
        let result = await axios.get(`/api/admin/orderlist${param}`)
          .catch(err => console.log(err));
        console.log(result)
        this.orderList = result.data;
      },

      // 회원목록
      async getMemberList() {
        let param = '';
        param = `?keyword=${this.keyword}&type=${this.type}&status=${this.status}`;
        let result = await axios.get(`api/admin/memberlist${param}`)
            .catch(err => console.log(err));
        this.memberList = result.data;
      },
  
      // 전체 데이터 갯수
      async getListCount() {
        let param = '';
        param = `?start_date=${this.start_date}&end_date=${this.end_date}&merchant_uid=${this.merchant_uid}`
        param += `&member_code=${this.member_code}&product_name=${this.product_name}&order_status=${this.order_status}`;
  
        console.log('param : ', param)
        let result = await axios.get(`/api/admin/ordercnt${param}`)
          .catch(err => console.log(err));
        console.log('result.data[0].count : ', result.data[0].count)
        this.TOTAL_ARITCLES = result.data[0].count;
      },
  
      async goToDetail(merchant_uid, member_code, order_code) {
        this.$router.push({ path: '/admin/order/orderdetail', query: { merchant_uid: merchant_uid, member_code: member_code, order_code: order_code } });
      },
  
      searchOrder() {
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
  
<style>
input::placeholder {
    color: #cccccc;
}
</style>