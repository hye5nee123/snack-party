<template>
      <!-- Single Page Header start -->
      <div class="container-fluid page-header py-5">
        <h1 class="text-center text-white display-6">공지사항</h1>
    </div>
    <!-- Single Page Header End -->
  <div class="container">
    <div class="container-xxl flex-grow-1 container-p-y">
      <!-- Product List Table -->
      <div class="card">
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

                  <th class="sorting sorting_asc" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1"
                    colspan="1" style="width: 10%;" aria-label="product: activate to sort column descending"
                    aria-sort="ascending">
                    공지코드</th>

                  <th class="sorting sorting_asc" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1"
                    colspan="1" style="width: 10%;" aria-label="product: activate to sort column descending"
                    aria-sort="ascending">
                    제목</th>

                  <th class="sorting sorting_asc" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1"
                    colspan="1" style="width: 10%;" aria-label="product: activate to sort column descending"
                    aria-sort="ascending">
                    작성일자</th>

                  <th class="sorting sorting_asc" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1"
                    colspan="1" style="width: 10%;" aria-label="product: activate to sort column descending"
                    aria-sort="ascending">
                    내용</th>
                </tr>
              </thead>

              <tbody v-for="(notice, i) in noticeList" :key="i">
                <tr>
                  <td>{{ notice.notice_code }}</td>
                  <td>{{ notice.notice_title }}</td>
                  <td>{{ $formatDate(notice.notice_date) }}</td>
                  <td><button type="button" class="btn btn-primary" data-bs-toggle="modal"
                      :data-bs-target="'#exampleModal' + i" :notice="notice"
                      @click="noticeContentFunc(notice.notice_content)">
                      내용보기
                    </button>
                  </td>
                </tr>

                <!-- 모달 START -->
                <div class="modal fade" :id="'exampleModal' + i" tabindex="-1" aria-labelledby="exampleModalLabel"
                  aria-hidden="true">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">{{ notice.notice_title }}</h5>
                        <button type="button" class="btn-close form-control" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body">
                        <table>
                          <tr>
                            <th>No.</th>
                            <td><input type="text" class="form-control" :value="notice.notice_code" readonly></td>
                          </tr>
                          <tr>
                            <th>등록일자</th>
                            <td><input type="text" class="form-control" :value="$formatDate(notice.notice_date)" readonly></td>
                          </tr>
                          <tr>
                            <th>내용</th>
                            <textarea rows="20" cols="50" class="form-control" v-model="content" readonly></textarea>
                          </tr>
                        </table>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary form-control" data-bs-dismiss="modal">닫기</button>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- 모달 END -->
              </tbody>
            </table>
            <!-- Contents END -->

            <!-- Pagination START -->
            <PaginationComp :ITEM_PER_PAGE="ITEM_PER_PAGE" :PAGE_PER_SECTION="PAGE_PER_SECTION"
              :TOTAL_ARITCLES="TOTAL_ARITCLES" @change-page="onChangePage" style="margin-bottom: 50px;" />
            <!-- Pagination END -->
          </div>
        </div>
        <!-- Table END -->
      </div>
      <NoticeModalComp />
    </div>
  </div>
</template>

<script>
// Pagination 컴포넌트 import
import axios from 'axios';
import PaginationComp from '../components/PaginationComp.vue';
import NoticeModalComp from '../components/NoticeModalComp.vue';

export default {
  // Pagination 컴포넌트 import
  components: {
    PaginationComp,
    NoticeModalComp
  },
  data() {
    return {
      noticeList: [],  // limit, offset 적용된 리스트
      curPage: 1,       // 현재 페이지
      pageData: 0,      // offset에 전달할 페이징 데이터
      content: '',

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

    noticeContentFunc(notice_content) {
      this.content = notice_content;
    }
  }
}
</script>
<style scoped>
th {
  width: 100px;
}
input:read-only, textarea:read-only {
  background-color: white;
}
.page-header {
    position: relative;
    background: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(../assets/img/snack2.jpg);
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
}
</style>