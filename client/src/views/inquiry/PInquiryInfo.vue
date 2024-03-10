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
          <button  v-on:click="deleteInquiry( pInquiryInfo.inquiry_code)">삭제</button>
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
          let result = await axios.get('/api/inquiry/detail/' +inquiry_code);
          this.pInquiryInfo = result.data;
        } catch (error) {
          console.log(error);
        }
      },
      async deleteInquiry(inquiry_code){
      let answer = confirm("문의를 삭제하시겠습니까?")
      if(answer){
        let result = await axios.delete('/api/inquiry/' + inquiry_code)
                    .catch (error => console.log(error))
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
  