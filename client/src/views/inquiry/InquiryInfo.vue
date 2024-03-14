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
                  <td>{{ inquiryInfo.inquiry_code }}</td>
                  <th>제목</th>
                  <td>{{ inquiryInfo.title }}</td>
                  <th>작성자</th>
                  <td>{{ this.$store.state.memberStore.memberInfo.member_name }}</td>
                </tr>
                <tr>
                  <th>내용</th>
                  <td style="width: 150px; height:100;">{{ inquiryInfo.content }}</td>
                </tr>
              </thead>
            </table>
          </div>
        </div>
        <button class="btn btn-sm border-secondary rounded-pill px-2 py-2 text-primary ms-2"
          v-on:click="goToUpdate()">수정</button>
        <button class="btn btn-sm border-secondary rounded-pill px-2 py-2 text-primary ms-2"
          v-on:click="deleteInquiry(inquiryInfo.inquiry_code)">삭제</button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      iCode: this.$route.query.inquiry_code,
      inquiryInfo: {
        inquiry_code: this.$route.query.inquiry_code,
        title: "",
        content: ""
      },
    };
  },
  created() {
    console.log('this.$route.query : ', this.iCode);
    if (this.iCode) {
      this.getInquiryInfo(this.iCode);
    } else {
      console.error("inquiry_code가 전달되지 않았습니다.");
    }
  },
  methods: {
    async getInquiryInfo(inquiry_code) {
      try {
        let result = await axios.get('/api/inquiry/inquirydetail/' + inquiry_code);
        this.inquiryInfo = result.data;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteInquiry(inquiry_code) {
      let answer = confirm("문의를 삭제하시겠습니까?")
      if (answer) {
        let result = await axios.delete('/api/inquiry/' + inquiry_code)
          .catch(error => console.log(error))
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
    },
    goToUpdate() {
      //this.$router.push({ path: '/userUpdate', query: {'userId' : userId}});  
      this.$router.push({ path: '/inquiryupdate', query: { 'inquiry_code': this.inquiryInfo.inquiry_code } });
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
