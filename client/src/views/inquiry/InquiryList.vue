<template>
<div class="container" style="margin-top: 200px;">
  <h3>1:1문의</h3>
  <table>
    <thead>
      <tr>
        <th>번호</th>
        <th>분류</th>
        <th>제목</th>
        <th>상태</th>
        <th>등록일</th>
      </tr>
    </thead>
    <tbody>
     <!-- <tr v-for="(inquiry,i) in inquiryList" @click="getInquiryList(inquiry)">  -->
      <td>{{  }}</td>
    </tbody>
  </table>
</div>
</template>
<script>
import axios from 'axios';
export default{ 
  data(){
    return {
      inquiryList: [],
      
    };
  },
  created() {
    this.getInquiryList();
  },
  methods: {
            async getInquiryList() {
            console.log('getInquiryList() 실행')
            let result = await axios.get('/api/inquiry/')
                .catch(err => console.log(err));
                
            console.log('result : ', result);
            this.inquiryList = result.data;
        }
  }
}
</script>