<template>
  <div class="container-fluid fruite py-5">
    <div class="content-wrapper">
      <div class="container-xxl flex-grow-1 container-p-y">
        <div class="card">
          <div class="table-responsive text-nowrap">
            <table class="table table-hover">
              <thead>
                <tr>
                  <td>문의코드</td>
                  <th>제목</th>
                  <th>작성자</th>
                  <th>작성일</th>
                  <th>답변상태</th>
                </tr>
              </thead>
              <tbody class="table-border-bottom-0">
                <tr :key="i" v-for="(pInquiry, i) in pInquiryList"
                  v-on:click="goToProInquiryInfo(pInquiry.inquiry_code)">
                  <td>{{ pInquiry.inquiry_code }}</td>
                  <td>{{ pInquiry.inquiry_title }}</td>
                  <td>{{ pInquiry.member_name }}</td>
                  <td>{{ dateformat(pInquiry.inquiry_date) }}</td>
                  <td>{{ pInquiry.answer_status }}</td>
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
  props: ["pcode", "type"],
  data() {
    return {
      pInquiryList: []
      //상품 코드를 넣어주면 보임
    };
  },
  created() {
    this.getPInquiryList();
  },
  methods: {
    async getPInquiryList() {
      let url = "";
      if (this.type == "product") {
        url = `/api/inquiry/${this.pcode}`
      } else if (this.type == "admin") {
        url = `/api/inquiry/`
      } else {
        url = `/api/inquiry/:member_code`
      }
      let result = await axios.get(url)
        .catch(err => console.log(err));
      this.pInquiryList = result.data;
    },
    // formatDate(dateString) {
    //   const date = new Date(dateString);
    //   const year = date.getFullYear();
    //   let month = (1 + date.getMonth()).toString().padStart(2, '0');
    //   let day = date.getDate().toString().padStart(2, '0');

    //   return `${year}-${month}-${day}`;
    // }
    dateformat(dateString) {
      return this.$formatDate(dateString);
    },
    goToProInquiryInfo(inquiry_code) {
      this.$router.push({ path: '/pinquiryInfo', query: { 'inquiry_code': inquiry_code } });
      //this.$router.push({ name: 'userInfo', query : { "userId" : userId }});
    }

  }
}
</script>
<style scoped>
.content-wrapper {
  height: 200px
}
</style>