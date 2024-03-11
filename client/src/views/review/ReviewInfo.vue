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
                  <td>{{ reviewInfo.member_name }}</td>
                  <th>별점</th>
                  <td>{{ reviewInfo.stars }}</td>
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
        <br>
        <button class="btn btn-sm border-secondary rounded-pill px-2 py-2 text-primary ms-2" v-on:click="goToUpdate()">
          수정 </button>
        <button class="btn btn-sm border-secondary rounded-pill px-2 py-2 text-primary ms-2"
          v-on:click=" deleteReview(reviewInfo.review_code)"> 삭제 </button>
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
        review_content: "",
        stars: "",
        member_code: "",
        member_name: ""
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
      if (this.$store.state.memberStore.memberInfo.member_code == this.reviewInfo.member_code) {

        this.$router.push({ path: '/reviewupdate', query: { 'review_code': this.reviewInfo.review_code } });
      } else {
        alert("수정권한이 없습니다")
      }
      // 수정폼 컴포넌트 호출
      //this.$router.push({ path: '/userUpdate', query: {'userId' : userId}});  
    },
    async deleteReview(review_code) {
      if (this.$store.state.memberStore.memberInfo.member_code == this.reviewInfo.member_code) {
        let answer = confirm("리뷰를 삭제하시겠습니까?");
        if (answer) {
          try {
            console.log(review_code);
            await axios.delete('/api/review/' + this.reviewInfo.review_code);
            this.$router.go(-1);
          } catch (error) {
            console.log(error);
          }
        }
      } else {
        alert("삭제권한이 없습니다")
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

.card {
  width: 100%;
}

.btn btn-sm border-secondary rounded-pill px-2 py-2 text-primary ms-2 {
  padding: 1000px;
}
</style>