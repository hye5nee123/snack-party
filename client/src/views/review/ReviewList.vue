<template>
<div class="container-fluid fruite py-5">
    <div class="container-fluid page-header py-5">
        <h1 class="text-center text-white display-6">Shop</h1>
        <ol class="breadcrumb justify-content-center mb-0">
            <li class="breadcrumb-item"><a href="/main">Home</a></li>
            <li class="breadcrumb-item"><a href="#">Pages</a></li>
            <li class="breadcrumb-item active text-white">Shop</li>
        </ol>
    </div>
 <div class="content-wrapper">
    <div class="container-xxl flex-grow-1 container-p-y">
      <div class="card">
      <div class="table-responsive text-nowrap">
        <table class="table table-hover">
          <thead>
            <tr>
              <th>리뷰코드</th>
              <th>제목</th>
              <th>내용</th>
              <th>별점</th>
              <th>작성자</th>
            </tr>
          </thead>
          <tbody class="table-border-bottom-0">          
            <tr :key="i" v-for="(review, i) in reviewList" @click="getReviewList(review)">
              <td>{{ review.review_code }}</td>
              <td>{{ review.review_title }}</td>
              <td>{{ review.review_content }}</td>
              <td>{{ review.stars }}</td>
              <td>{{ review.member_code }}</td>
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
    data() {
        return {
          reviewList: [],
            
        };
    },
    created() {
        this.getReviewList();
    },
    methods: {
        async getReviewList() {
            console.log('getReviewList() 실행')
            let result = await axios.get('/api/review/')
                .catch(err => console.log(err));
                
            console.log('result : ', result);
            this.reviewList = result.data;
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
<style scoped>
    .content-wrapper {
        height: 200px
    }
</style>