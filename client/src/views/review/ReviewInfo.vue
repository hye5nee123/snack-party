<template>
  <div>
    <div class="content-wrapper">
      <div class="container-xxl flex-grow-1 container-p-y">
        <div class="card">
          <div class="table-responsive text-nowrap">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th>글번호</th>
                  <td>{{ reviewInfo.review_code }}</td>
                  <th>제목</th>
                  <td>{{ reviewInfo.review_title }}</td>
                  <th>작성자</th>
                  <td>{{ this.$store.state.memberStore.memberInfo.member_name }}</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>내용</th>
                  <td style="width: 150px; height:100;">{{ reviewInfo.review_content }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <button v-on:click="goToUpdate()">수정</button>
        <button v-on:click=" deleteReview(reviewInfo.review_code)">삭제</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      reviewInfo: {
        review_code: this.$route.query.review_code,
        review_title: "",
        review_content: ""
      },
    };
  },
  created() {
    this.getReviewInfo(this.$route.query.review_code);
  },
  methods: {
    async getReviewInfo(review_code) {
      try {
        let result = await axios.get('/api/review/detail/' + review_code);
        this.reviewInfo = result.data;
      } catch (error) {
        console.log(error);
      }
    },
    goToUpdate() {
      // 수정폼 컴포넌트 호출
      //this.$router.push({ path: '/userUpdate', query: {'userId' : userId}});  
      this.$router.push({ path: '/reviewupdate', query: { 'review_code': this.reviewInfo.review_code } });
    },
    async deleteReview(review_code) {
      let answer = confirm("리뷰를 삭제하시겠습니까?")
      if (answer) {
        let result = await axios.delete('/api/review/' + review_code)
          .catch(error => console.log(error))
        this.$router.go(-1);
        console.log(result)
        // if(result.data.affectedRows != 0 && result.data.changedRows == 0){
        //   alert('정상적으로 삭제 되었습니다.');
        //   this.$router.go(-1);
        // }
        // else{
        //   alert('삭제 되지 않았습니다.');
        // }
      }
    }
  }
}

</script>

<style scoped>
.content-wrapper {
  height: 200px;
  margin-top: 200px;
}

.container {
  margin-top: 200px;
}
</style>