<template>
  <div class="container-xxl flex-grow-1 container-p-y">
    <div class="card">

      <!-- 필터 START -->
      <div class="card-header">
        <div class="d-flex justify-content-between align-items-center row py-3 gap-3 gap-md-0">
          <div class="col-md-4 product_status"><select id="ProductStatus" class="form-select text-capitalize">
              <option value="">Status</option>
              <option value="Scheduled">Scheduled</option>
              <option value="Publish">Publish</option>
              <option value="Inactive">Inactive</option>
            </select></div>
          <div class="col-md-4 product_category"><select id="ProductCategory" class="form-select text-capitalize">
              <option value="">Category</option>
              <option value="Household">Household</option>
              <option value="Office">Office</option>
              <option value="Electronics">Electronics</option>
              <option value="Shoes">Shoes</option>
              <option value="Accessories">Accessories</option>
              <option value="Game">Game</option>
            </select></div>
          <div class="col-md-4 product_stock"><select id="ProductStock" class="form-select text-capitalize">
              <option value=""> Stock </option>
              <option value="Out_of_Stock">Out of Stock</option>
              <option value="In_Stock">In Stock</option>
            </select></div>
        </div>
      </div>
      <!-- 필터 END -->

      <!-- 검색창 START -->
      <div class="card-header d-flex border-top rounded-0 flex-wrap py-md-0">
        <!-- 인풋상자 START -->
        <div class="me-5 ms-n2 pe-5">
          <div id="DataTables_Table_0_filter" class="dataTables_filter">
            <label>
              <input type="search" class="form-control" placeholder="Search Product" aria-controls="DataTables_Table_0">
            </label>

            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
              modal
            </button>
          </div>
        </div>
        <!-- 인풋상자 END -->
      </div>
      <!-- 검색창 END -->

      <!-- 테이블 START -->
      <div class="card-datatable table-responsive overflow-auto">
        <div id="DataTables_Table_0_wrapper" class="dataTables_wrapper dt-bootstrap5 no-footer">
          <div class="accordion accordion-flush" id="accordionFlush">
          <table class="table">
            <thead>
              <tr>
                <th class="sorting sorting_asc" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1"
                  style="width: 10%;" aria-label="product: activate to sort column descending" aria-sort="ascending">
                  공지코드</th>

                <th class="sorting sorting_asc" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1"
                  style="width: 10%;" aria-label="product: activate to sort column descending" aria-sort="ascending">
                  제목</th>

                <th class="sorting sorting_asc" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1"
                  style="width: 10%;" aria-label="product: activate to sort column descending" aria-sort="ascending">
                  작성일자</th>
              </tr>
            </thead>
            <tbody v-for="(notice, i) in noticeList" :key="i" class="accordion-item" :id="i">
              <tr data-bs-toggle="collapse" :data-bs-target="'#r'+ i" aria-expanded="false" :aria-controls="'r'+ i">
                <td>{{ notice.notice_code }}</td>
                <td>{{ notice.notice_title }}</td>
                <td>{{ $formatDate(notice.notice_date) }}</td>
              </tr>
              <tr class="collapse accordion-collapse" :id="'r'+ i" data-bs-parent="#accordionFlush" :aria-labelledby="i" >
                <td colspan="5"> {{ notice.notice_content }} </td>
              </tr>
            </tbody>
          </table>
          </div>

          <!-- 페이지네이션 START -->
          <PaginationComp :ITEM_PER_PAGE="ITEM_PER_PAGE" :PAGE_PER_SECTION="PAGE_PER_SECTION"
            :TOTAL_ARITCLES="TOTAL_ARITCLES" @change-page="onChangePage" style="margin-bottom: 50px;" />
          <!-- 페이지네이션 END -->

        </div>
      </div>
      <!-- 테이블 END -->
    </div>
  </div>
</template>

<script>
// Pagination 컴포넌트 import
import axios from 'axios';
import PaginationComp from './PaginationComp.vue';

export default {
  // Pagination 컴포넌트 import
  components: {
    PaginationComp,
  },
  data() {
    return {
      noticeList: [],  // limit, offset 적용된 리스트
      curPage: 1,       // 현재 페이지
      pageData: 0,      // offset에 전달할 페이징 데이터

      ITEM_PER_PAGE: 10,     // 한 페이지에 출력할 데이터 수
      PAGE_PER_SECTION: 5,  // 한번에 보여줄 페이지 버튼 수
      TOTAL_ARITCLES: 0     // 전체 데이터 갯수
    };
  },
  created() {
    this.getListCount();
    this.getNoticeList();
  },
  computed: {
    pageStartIdx() {
      return (this.curPage - 1) * this.ITEM_PER_PAGE;
    }
  },
  methods: {
    // 페이지네이션 컴포넌트에서 전달되는 emit event
    onChangePage(data) {
      this.curPage = data;
      this.pageData = (this.curPage - 1) * this.ITEM_PER_PAGE;
      this.getNoticeList();
    },
    // limit, offset, 적용된 데이터 리스트
    async getNoticeList() {
      let result = await axios.get(`/api/notice/list/${this.ITEM_PER_PAGE}/${this.pageData}`)
        .catch(err => console.log(err));
      console.log('result : ', result)
      this.noticeList = result.data;
    },
    // 전체 데이터 갯수
    async getListCount() {
      let result = await axios.get('/api/notice/count')
        .catch(err => console.log(err));
      console.log('count : ', result.data[0].count)
      this.TOTAL_ARITCLES = result.data[0].count;
    },
  }
}
</script>