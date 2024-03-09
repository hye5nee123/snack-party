<template>
  <div class="container-fluid fruite py-5">
    <div class="content-wrapper">
      <div class="container-xxl flex-grow-1 container-p-y">
        <div class="card">
          <div class="table-responsive text-nowrap">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th>제목</th>
                  <th>내용</th>
                  <th>작성자</th>
                  <th>별점</th>
                </tr>
              </thead>
              <tbody class="table-border-bottom-0">
                <tr :key="i" v-for="(review, i) in reviewList" v-on:click="goToReviewInfo(review.review_code)">
                  <td>{{ review.review_title }}</td>
                  <td>{{ review.review_content }}</td>
                  <td>{{ review.member_id }}</td>
                  <td>{{ review.stars }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <PaginationComp :ITEM_PER_PAGE="ITEM_PER_PAGE" :PAGE_PER_SECTION="PAGE_PER_SECTION" :TOTAL_ARITCLES="TOTAL_ARITCLES"
      @change-page="onChangePage" />
  </div>
</template>
<script>
import axios from 'axios';
import PaginationComp from "./PaginationComp.vue";

export default {
  props: ["pcode", "type"],
  components: {
    PaginationComp
  },

  data() {
    return {
      reviewList: [],
      totalStars: 0, // 총 별점
      totalReviews: 0,// 총 리뷰 개수

      curPage: 1,       // 현재 페이지
      pageData: 0,      // offset에 전달할 페이징 데이터

      ITEM_PER_PAGE: 3,     // 한 페이지에 출력할 데이터 수
      PAGE_PER_SECTION: 5,  // 한번에 보여줄 페이지 버튼 수
      TOTAL_ARITCLES: 0     // 전체 데이터 갯수
    };
  },
  created() {
    this.getReviewList();
    this.getReviewCnt();
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
      this.getReviewList();
    },
    async getReviewList() {
      let url = "";
      if (this.type == "product") {
        url = `/api/review/detaillist/${this.pcode}/${this.ITEM_PER_PAGE}/${this.pageData}`
      } else if (this.type == "admin") {
        url = `/api/review/`;
      } else {
        url = `/api/review/member_code`
      }
      let result = await axios.get(url)
        .catch(err => console.log(err));

      this.reviewList = result.data
    },
    // 전체 데이터 갯수
    async getReviewCnt() {
      let result = await axios.get(`/api/review/reviewCnt/${this.pcode}`)
        .catch(err => console.log(err));
      this.TOTAL_ARITCLES = result.data[0].count;
    },

    //저장버튼.
    //뒤가 넘겨주는 파라미터임.
    goToReviewInfo(review_code) {
      this.$router.push({ path: '/reviewInfo', query: { 'review_code': review_code } });
      //this.$router.push({ name: 'userInfo', query : { "userId" : userId }});
    }
    // async getReviewInfo(review) {
    //     console.log('getReviewInfo() 실행')
    //     let result = await axios.get(`/api/review/${review.review_code}`)
    //         .catch(err => console.log(err));

    //     console.log(result);
    //     this.reviewInfo = result.data;
    // }
  }
}

</script>