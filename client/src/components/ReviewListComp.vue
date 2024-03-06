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
            <tr :key="i" v-for="(review, i) in reviewList">
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
</div>
</template>
<script>
import axios from 'axios';

export default {
  props: ["pcode","type"],
    
  data() {
    return {
      reviewList: []
    };
  },
  created() {
    this.getReviewList();
  },
  methods: {
    async getReviewList() {
      let url = "";
      if (this.type == "product") {
        url = `/api/review/detailreview/${this.pcode}`
      } else if (this.type == "admin") {
        url = "/api/review/";
      } else {
        url =`/api/review/:member_code`
      }
      let result = await axios.get(url)
          .catch(err => console.log(err));
          
      console.log('result.data : ', result.data);
      this.reviewList = result.data
    },
    
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