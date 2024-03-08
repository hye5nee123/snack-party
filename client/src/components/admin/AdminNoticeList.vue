<template>
  <div class="container-xxl flex-grow-1 container-p-y">

    <!-- Product List Table -->
    <div class="card">

      <!-- Filter START -->
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
      <!-- Filter END -->

      <!-- Search START -->
      <div class="card-header d-flex border-top rounded-0 flex-wrap py-md-0">

        <!-- InputBox START -->
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
        <!-- InputBox END -->
      </div>
      <!-- Search END -->

      <!-- Table START -->
      <div class="card-datatable table-responsive overflow-auto">
        <div id="DataTables_Table_0_wrapper" class="dataTables_wrapper dt-bootstrap5 no-footer">

          <!-- Contents START -->
          <table class="datatables-products table border-top dataTable no-footer dtr-column collapsed"
            id="DataTables_Table_0" aria-describedby="DataTables_Table_0_info" style="width: 100%;">
            <thead>
              <tr>
                <!-- <th class="sorting_disabled dt-checkboxes-cell dt-checkboxes-select-all" rowspan="1" colspan="1"
                  style="width: 1px;" data-col="1" aria-label=""><input type="checkbox" class="form-check-input"></th> -->

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

            <tbody>
              <tr v-for="(notice, i) in noticeList" :key="i" >
                <td>{{ notice.notice_code }}</td>
                <td>{{ notice.notice_title }}</td>
                <td>{{ $formatDate(notice.notice_date) }}</td>
              </tr>
            </tbody>
          </table>
          <!-- Contents END -->
          
          <!-- Pagination START -->
          <PaginationComp :ITEM_PER_PAGE="ITEM_PER_PAGE" :PAGE_PER_SECTION="PAGE_PER_SECTION" :TOTAL_ARITCLES="TOTAL_ARITCLES"
            @change-page="onChangePage" style="margin-bottom: 50px;" />
          <!-- Pagination END -->
        </div>
      </div>
      <!-- Table END -->
    </div>
  </div>
  <div class="accordion" id="accordionExample">
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingOne">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
        Accordion Item #1
      </button>
    </h2>
    <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
      <div class="accordion-body">
        <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingTwo">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
        Accordion Item #2
      </button>
    </h2>
    <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
      <div class="accordion-body">
        <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingThree">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
        Accordion Item #3
      </button>
    </h2>
    <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
      <div class="accordion-body">
        <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
      </div>
    </div>
  </div>
</div>
  <ModalComp />

</template>

<script>
// Pagination 컴포넌트 import
import axios from 'axios';
import PaginationComp from '../PaginationComp.vue';
import ModalComp from '../ModalComp.vue';

export default {
  // Pagination 컴포넌트 import
  components: { 
    PaginationComp,
    ModalComp
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