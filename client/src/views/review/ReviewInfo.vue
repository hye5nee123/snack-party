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
                  <td>{{reviewInfo.review_code.slice(-3)}}</td>
                  <th>제목</th>
                  <td>{{reviewInfo.review_title }}</td>
                  <th>작성자</th>
                  <td>{{ this.$store.state.memberStore.memberInfo.member_name  }}</td>
                </tr>
                <tr>
                  <th>내용</th>
                  <td style="width: 150px; height:100;">{{  reviewInfo.review_content }}</td>
                </tr>
              </thead>
            </table>
          
          </div>
        </div>
          <button>수정</button>
          <button>삭제</button>
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
        review_code:"",
        review_title: "",
        review_content:""
      },
      review_code: "REV00007"
    };
  },
  created() {
    this.getReviewInfo();
  },
  methods: {
    async getReviewInfo() {
      try {
        const response = await axios.get('/api/review/detail/' + this.review_code);
        this.reviewInfo = response.data;
      } catch (error) {
        console.log(error);
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
