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

    <PaginationTest :ITEM_PER_PAGE="ITEM_PER_PAGE" :PAGE_PER_SECTION="PAGE_PER_SECTION" :TOTAL_ARITCLES="this.listCount"
      @change-page="onChangePage" />
    
    curPage : {{ curPage }}
    pageData : {{ this.pageData }}
  </div>
</template>

<script>
import PaginationTest from './PaginationTest.vue';
import axios from 'axios';

export default {
  components: { PaginationTest },
  data() {
    const articles = new Array(111);
    for (let i = 0; i < articles.length; i++) {
      articles[i] = `Article ${i + 1}`;
    }

    return {
      noticeList : [],
      listCount : 0,

      ITEM_PER_PAGE: 5,
      PAGE_PER_SECTION: 5,
      curPage: 1,
      pageData: 0
    };
  },
  created() {
    this.getNoticeList();
    this.getListCount();
  },
  computed: {
    pageStartIdx() {
      return (this.curPage - 1) * this.ITEM_PER_PAGE;
    }
  },
  methods: {
    onChangePage(data) {
      this.curPage = data;
      this.pageData = (this.curPage - 1) * 5;
      this.getNoticeList();
    },
    async getNoticeList() {
      let result = await axios.get(`/api/notice/list/${this.pageData}`)
        .catch(err => console.log(err));
      console.log('result : ', result)
      this.noticeList = result.data;
    },
    async getListCount() {
      let result = await axios.get('/api/notice/count')
        .catch(err => console.log(err));
      console.log('count : ', result.data[0].count)
      this.listCount = result.data[0].count;
    },
  }
}
</script>