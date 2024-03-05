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
                  <th>제목</th>
                  <th>작성자</th>
                  <th>작성일</th>
                  <th>답변상태</th>
                </tr>
              </thead>
              <tbody class="table-border-bottom-0">
                <tr :key="i" v-for="(pInquiry, i) in pInquiryList" @click="getPInquiryList(pInquiry)">
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

export default{ 
    data(){
        return{
          pInquiryList: [],
          product_code:'PRO00001'
          //상품 코드를 넣어주면 보임
        };
    },
    created(){
        this.getPInquiryList(this.product_code);
    },
    methods:{
            async getPInquiryList(pcode) {
            console.log('getPInquiryList() 실행')
            let result = await axios.get('/api/inquiry/'+pcode)
                .catch(err => console.log(err));
                
            console.log('result : ', result);
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
      }
    }
}
</script>
<style scoped>
    .content-wrapper {
        height: 200px
    }
</style>