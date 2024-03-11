<template>
  <div class="container">
    <div id="show">
      <h3>문의수정</h3>
    </div>
    <form>
      <table>
        <tr>
          <td>제목</td>
          <td>
            <input v-model="InquiryInfo.title" type="text" class="form-control" required />
          </td>
        </tr>
        <tr>
          <td> 작성자 </td>
          <td>{{ this.$store.state.memberStore.memberInfo.member_name }}</td>
        </tr>
        <tr>
          <td>문의유형</td>
          <td>
            <select v-model="InquiryInfo.p_inquiry_type">
              <option value="">선택하세요</option>
              <option value="취소/교환/반품">취소/교환/반품</option>
              <option value="회원정보">회원정보</option>
              <option value="배송">배송</option>
              <option value="주문/결제">주문/결제</option>
              <option value="서비스/오류/기타">서비스/오류/기타</option>
            </select>
          </td>
        </tr>
        <tr>
          <td>내용</td>
          <td colspan="2" id="textarea">
            <textarea id="textarea2" cols="80" rows="10" name="content" class="form-control"
              v-model="InquiryInfo.content"></textarea>
          </td>
        </tr>
      </table>
      <div style="text-align: center">
        <button type="button" class="btn btn-outline-danger me-2 mt-2" @click="updateInfo()">
          저장
        </button>
        <button type="reset" class="btn btn-danger mt-2" @click="resetInfo()">취소</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      InquiryInfo: {
        inquiry_code: this.$route.query.inquiry_code,
        p_inquiry_type: "",
        title: "",
        content: "",
        member_code: this.$store.state.memberStore.memberInfo.member_code
      },
      memberInfo: this.$store.state.memberStore.memberInfo
    };
  },
  created() {
    this.inquiry_code = this.$route.query.inquiry_code;
    this.getInquiryInfo();
  },
  methods: {
    async getInquiryInfo() {
      try {
        let result = await axios.get(`/api/inquiry/inquirydetail/${this.$route.query.inquiry_code}`);
        this.InquiryInfo = result.data;
      } catch (error) {
        console.log(error);
      }
    },
    updateInfo() {
      if (!this.validation()) return;

      let data = this.getSendData();

      axios
        .put(`/api/inquiry/${this.InquiryInfo.inquiry_code}`, data)
        .then((result) => {
          console.log(result);

          let count = result.data.changedRows;
          if (count == 0) {
            alert(`수정되지 않았습니다.\n메세지를 확인해주세요\n${result.data.message}`);
            this.$router.push({ path: "/inquirylist" });
          } else {
            this.$router.push({
              path: "/inquiryinfo",
              query: { inquiry_code: this.InquiryInfo.inquiry_code },
            });
            alert(`정상적으로 수정되었습니다.`);
          }
        })
        .catch((err) => console.log(err));
    },
    validation() {
      if (this.InquiryInfo.title == "") {
        alert('제목이 입력되지 않았습니다.');
        return false;
      }

      if (this.InquiryInfo.content == "") {
        alert('내용이 입력되지 않았습니다.');
        return false;
      }

      if (this.InquiryInfo.p_inquiry_type == "") {
        alert('문의유형을 선택해주세요.');
        return false;
      }

      return true;
    },
    getSendData() {
      let obj = this.InquiryInfo;
      let delData = ["inquiry_code"];
      let newObj = {};

      for (let field in obj) {
        if (!delData.includes(field)) {
          newObj[field] = obj[field];
        }
      }

      return { param: newObj };
    },
    resetInfo() {
      location.reload(true);
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 200px;
}

table {
  border-collapse: collapse;
  width: 80%;
  margin-bottom: 20px;
}

td {
  padding: 10px;
}

select,
textarea,
input[type="text"],
input[type="file"] {
  width: 100%;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  opacity: 0.8;
}
</style>
