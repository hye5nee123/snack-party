<template>
<div>
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
     <tr v-for="(inquiry,i) in inquiryList"  :key="i"> 
      <td>{{ inquiry.inquiry_code.slice(-3)}}</td>
      <td>{{ inquiry.p_inquiry_type}}</td>
      <td>{{ inquiry.title }}</td>
      <td>{{ inquiry.answer_status }}</td>
      <td>{{ dateformat(inquiry.inquiry_date) }}</td>
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
    props:["type"]
  data(){
    return {
      inquiryList: []
    };
  },
  created() {
    this.getInquiryList();
  },
  methods: {
      async getInquiryList() { 
          let url = "";
          if (this.type == "product") {
            url=
          }
  let result = await axios.get(`/api/inquiry/{{member_code}}`)
      .catch(err => console.log(err));
  console.log('result : ', result);
  this.inquiryList = result.data;
    },
 dateformat(dateString) {
        return this.$formatDate(dateString);
      }
  }
}
</script>
<style scoped>

    .content-wrapper {
        height: 200px;
        margin-top:200px;
    }
    .container{
        margin-top: 200px;
    }
</style>