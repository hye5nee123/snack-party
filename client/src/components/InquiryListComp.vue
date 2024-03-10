<template>
  <div class="content-wrapper">
    <div class="container-xxl flex-grow-1 container-p-y">
      <div class="card">
        <div class="table-responsive text-nowrap">
          <table class="table table-hover">
            <thead>
              <tr>
                <th>번호</th>
                <th>분류</th>
                <th>제목</th>
                <th>상태</th>
                <th>등록일</th>
              </tr>
            </thead>
            <tbody class="table-border-bottom-0">
              <tr v-for="(inquiry, i) in inquiryAll" :key="i" v-on:click="goToInquiryInfo(inquiry.inquiry_code)">
                <td>{{ inquiry.inquiry_code.slice(-3) }}</td>
                <td>{{ inquiry.p_inquiry_type }}</td>
                <td>{{ inquiry.title }}</td>
                <td>{{ inquiry.answer_status }}</td>
                <td>{{ formatDate(inquiry.inquiry_date) }}</td>
              </tr>
            </tbody>
          </table>
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
      inquiryAll: [],
      member_code: ''
    };
  },
  created() {
    this.member_code = this.$store.state.memberStore.memberInfo.member_code;
    this.getInquiryAll();
  },
  methods: {
    async getInquiryAll() {
      try {
        const response = await axios.get('/api/inquiry/test');
        this.inquiryAll = response.data;
      } catch (error) {
        console.error('Error fetching inquiry data:', error);
      }
    },
    formatDate(dateString) {
      // 날짜 형식을 변환하는 함수
      return this.$formatDate(dateString);
    },
    goToInquiryInfo(inquiry_code) {
      // 조사 정보 페이지로 이동하는 함수
      this.$router.push({ path: '/inquiryInfo', query: { 'inquiry_code': inquiry_code } });
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
