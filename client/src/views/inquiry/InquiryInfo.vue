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
                    <td>{{ InquiryInfo.inquiry_code }}</td>
                    <th>제목</th>
                    <td>{{ InquiryInfo.title }}</td>
                    <th>작성자</th>
                    <td>{{ this.$store.state.memberStore.memberInfo.member_name }}</td>
                  </tr>
                  <tr>
                    <th>내용</th>
                    <td style="width: 150px; height:100;">{{ InquiryInfo.content }}</td>
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
        InquiryInfo: {
          inquiry_code: "",
          title: "",
          content: ""
        }
      };
    },
    created() {
      // inquiry_code: this.$router.query.inquiry_code,
      this.getInquiryInfo(this.$router.query.inquiry_code);
    },
    methods: {
      async getInquiryInfo(inquiry_code) {
        try {
          const response = await axios.get('/api/inquiry/inquirydetail/' + inquiry_code);
          this.inquiry_code = response.data;
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
  