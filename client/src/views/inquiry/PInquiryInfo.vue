<template>
    <div>
      <div class="content-wrapper">
        <div class="container-xxl flex-grow-1 container-p-y">
          <div class="card">
            <div class="table-responsive text-nowrap">
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th>문의코드</th>
                    <td>{{ pInquiryInfo.inquiry_code }}</td>
                    <th>제목</th>
                    <td>{{ pInquiryInfo.title }}</td>
                    <th>작성자</th>
                    <td>{{ this.$store.state.memberStore.memberInfo.member_name }}</td>
                  </tr>
                  <tr>
                    <th>내용</th>
                    <td style="width: 150px; height:100;">{{ pInquiryInfo.content }}</td>
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
        pInquiryInfo: {
          inquiry_code: "",
          title: "",
          content: ""
        },
      };
    },
    created() {
      // review_code: this.$router.query.review_code,
      this.getpInquiryInfo(this.$route.query.inquiry_code);
    },
    methods: {
      async getpInquiryInfo(inquiry_code) {
        try {
          const response = await axios.get('/api/inquiry/detail/' +inquiry_code);
          this.pInquiryInfo = response.data;
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
  