<template>
  <div>
    <div class="table">
      <thead>
        <tr>
          <td>공지코드</td>
          <td>제목</td>
          <td>작성일자</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(notice,i) in noticeList" :key="i">
          <td>{{ notice.notice_code }}</td>
          <td>{{ notice.notice_title }}</td>
          <td>{{ $formatDate(notice.notice_date) }}</td>
        </tr>
      </tbody>
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
      noticeList : [],  // limit, offset 적용된 리스트
      curPage: 1,       // 현재 페이지
      pageData: 0,      // offset에 전달할 페이징 데이터

      ITEM_PER_PAGE: 5,     // 한 페이지에 출력할 데이터 수
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
</script>./PaginationComp.vue