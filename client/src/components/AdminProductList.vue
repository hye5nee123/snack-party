<template>
  <div class="col-10 justify-content-center m-4">
    <div class="card-header">
      <h5 class="card-title">Filter</h5>
      <table class="table">
        <tr>
          <td>카테고리</td>
          <td>
            <div class="input-group w-300">
              <select id="ProductCategory" class="form-select text-capitalize w-150">
                <option value="">전체 카테고리</option>
                <option value="e01">과자</option>
                <option value="e02">비스킷/크래커</option>
                <option value="e03">쿠키/파이</option>
                <option value="e04">유기농/전통과자</option>
                <option value="e05">초콜릿</option>
                <option value="e06">젤리/캐러멜</option>
              </select>
            </div>
          </td>
        </tr>
        <tr>
          <td>유통기한</td>
          <td>
            <div class="input-group w-300">
              <input class="form-control w-150 inbl" type="date" v-model="sDate" aria-label="default input example">
              <span style="margin: 0 5px;">~</span>
              <input class="form-control w-150 inbl" type="date" v-model="eDate" aria-label="default input example">
            </div>
            <div class="inbl">
              <button class="btn btn-outline-dark" @click="getOneMonthAfter">1개월</button>
              <button class="btn btn-outline-dark mgrl" @click="getSixMonthAfter">6개월</button>
              <button class="btn btn-outline-dark" @click="getOneYearAfter">12개월</button>
            </div>
          </td>
        </tr>
        <tr>
          <td>상품상태</td>
          <td>
            <div class="input-group w-300">
              <select id="ProductStock" class="form-select text-capitalize w-150">
                <option value=""> 재고 전체 </option>
                <option value="soldout">품절</option>
              </select>
            </div>
          </td>
        </tr>
        <tr>
          <td>상품명</td>
          <td>
            <div class="input-group w-300">
              <input type="text" class="form-control" placeholder="상품명을 입력하세요." aria-describedby="search-icon-1"
                v-model="skeyword" @keyup.enter="searchProduct">
              <span id="search-icon-1" class="input-group-text p-3" @click="searchProduct"><i class="fa fa-search"></i></span>
            </div>
          </td>
        </tr>
      </table>
    </div>
    <div>
      <table class="table table-hover ">
        <thead>
          <tr>
            <td>상품코드</td>
            <td>카테고리</td>
            <td>상품명</td>
            <td>판매가</td>
            <td>유통기한</td>
            <td>재고</td>
            <td>품절상태</td>
            <td>삭제</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, i) in productList" :key="i">
            <td>{{ product.product_code }}</td>
            <td>{{ product.category }}</td>
            <td>{{ product.product_name }}</td>
            <td>{{ $currencyFormat(product.product_price) }} 원</td>
            <td>유통기한</td>
            <td>{{ product.stock_cnt }}</td>
            <td>{{ product.stock_cnt == 0 ? '품절' : '' }}</td>
            <td><button>삭제</button></td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- Pagination 컴포넌트 -->
    <PaginationComp :ITEM_PER_PAGE="ITEM_PER_PAGE" :PAGE_PER_SECTION="PAGE_PER_SECTION" :TOTAL_ARITCLES="TOTAL_ARITCLES"
      @change-page="onChangePage" />
  </div>
</template>

<script>
// Pagination 컴포넌트 import
import PaginationComp from './PaginationComp.vue';
import axios from 'axios';

export default {
  // Pagination 컴포넌트 import
  components: { PaginationComp },
  data() {
    return {
      productList: [],  // limit, offset 적용된 리스트
      curPage: 1,       // 현재 페이지
      offset: 0,      // offset에 전달할 페이징 데이터

      ITEM_PER_PAGE: 12,     // 한 페이지에 출력할 데이터 수
      PAGE_PER_SECTION: 5,  // 한번에 보여줄 페이지 버튼 수
      TOTAL_ARITCLES: 0,     // 전체 데이터 갯수

      sDate: null,
      eDate: null,
    };
  },
  created() {
    this.getListCount();
    this.getProductList();
  },
  computed: {
    pageStartIdx() {
      return (this.curPage - 1) * this.ITEM_PER_PAGE;
    }
  },
  methods: {
    async getProductList() {
      let param = '';
      param = `?category=&keyword=&sort=&offset=${this.offset}`;
      let result = await axios.get(`/api/product${param}`)
        .catch(err => console.log(err));
      this.productList = result.data;
    },
    // 페이지네이션 컴포넌트에서 전달되는 emit event
    onChangePage(data) {
      this.curPage = data;
      this.offset = (this.curPage - 1) * this.ITEM_PER_PAGE;
      this.getProductList();
    },
    // 전체 데이터 갯수
    async getListCount() {
      let param = '';
      param = `?category=&keyword=`;
      let result = await axios.get(`/api/product/count${param}`)
        .catch(err => console.log(err));
      console.log('count : ', result.data[0].count);
      this.TOTAL_ARITCLES = result.data[0].count;
    },
    // 유통기한 메소드
    getOneMonthAfter() {
      let tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      this.sDate = this.formatDate(tomorrow);
      let oneMonthAfter = new Date();
      oneMonthAfter.setMonth(oneMonthAfter.getMonth() + 1);
      this.eDate = this.formatDate(oneMonthAfter);
    },
    getSixMonthAfter() {
      let oneMonthAfter = new Date();
      oneMonthAfter.setDate(oneMonthAfter.getDate() + 1);
      oneMonthAfter.setMonth(oneMonthAfter.getMonth() + 1);
      this.sDate = this.formatDate(oneMonthAfter);
      let SixMonthAfter = new Date();
      SixMonthAfter.setMonth(SixMonthAfter.getMonth() + 6);
      this.eDate = this.formatDate(SixMonthAfter);
    },
    getOneYearAfter() {
      let SixMonthAfter = new Date();
      SixMonthAfter.setDate(SixMonthAfter.getDate() + 1);
      SixMonthAfter.setMonth(SixMonthAfter.getMonth() + 6);
      this.sDate = this.formatDate(SixMonthAfter);
      let OneYearAfter = new Date();
      OneYearAfter.setFullYear(OneYearAfter.getFullYear() + 1);
      this.eDate = this.formatDate(OneYearAfter);
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      const year = date.getFullYear();
      let month = (1 + date.getMonth()).toString().padStart(2, '0');
      let day = date.getDate().toString().padStart(2, '0');

      return `${year}-${month}-${day}`;
    },
    // 상품 검색 기능
    searchProduct(){
      alert('하기시렁!');
    }

  }
}
</script>

<style>
.w-150 {
  width: 150px;
}

.w-300 {
  width: 300px;
}

.inbl {
  display: inline-block;
}

.mgr-20 {
  margin-right: 20px;
}

.mgrl {
  margin: 0 10px;
}
</style>