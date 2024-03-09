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
      iCode: this.$route.query.inquiry_code,
      inquiryInfo: {
        inquiry_code: "",
        title: "",
        content: ""
      }
    };
  },
  created() {
    console.log('this.$route.query : ' , this.iCode);
  if (this.iCode) {
    this.getInquiryInfo(this.iCode);
  } else {
    // inquiry_code가 전달되지 않은 경우에 대한 처리
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
