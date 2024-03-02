<template>
    <div id="show">
        <div class="page-title">
        <h3 class="text-center">review</h3>
        </div>

        <table id="writetable">
        <tr>
            <td class="title"><p>작성자</p></td>
            <td>
            <span>{{ userId }}</span>
            </td>
        </tr>
        
        <tr>
            <td class="title"><p>제목</p></td>
            <td>
            <input
                v-model="reviewInfo.review_title"
                type="text"
                id="title"
                name="title"
                required
            />
            </td>
        </tr>
        <tr>
            <td class="title"><p>첨부</p></td>
            <td>
            <input
                type="file"
                ref="fileInput"
                @change="handleFileChange"
                multiple
            />
            </td>
        </tr>
        <tr>
            <td colspan="2" id="textarea">
            <textarea
                id="textarea2"
                cols="130"
                rows="15"
                name="content"
                v-model="reviewInfo.review_content"
            ></textarea>
            </td>
        </tr>
        </table>
        <div style="text-align: center">
        <button
            type="button"
            class="btn btn-outline-danger me-2 mt-2"
            @click="saveInfo"
        >
            작성
        </button>
        <button type="reset" class="btn btn-danger mt-2">취소</button>
        </div>
    </div>
</template><script>
import axios from "axios";

export default {
data() {
    return {
      reviewInfo: {
        review_title: "",
        review_content: "",
        review_star:0,
        product_code:0,
        
      },
      userNo: "",
      bno: "",
      images: [],
    };
  },
  computed:{
    userId() {
      const userData = JSON.parse(sessionStorage.getItem("user"));
      console.log("userData:", userData); // 확인용 로그 추가
      return userData ? userData : null;
    },
  },
  created() {
    this.reviewInfo.prod_code = this.$route.query.prod_code;
    this.reviewInfo.order_no = this.$route.query.order_no
    console.log('this.reviewInfo.prod_code : ', this.reviewInfo.prod_code)
  },
  methods:{
    handleFileChange(event) {
      this.images = Array.from(event.target.files);
    },
    getInfo(comCode) {
      let method = "";
      let url = "";
      let data = null;

      method = "post";
      url = `/api/qna/review`;
      let info = this.reviewInfo;
      info.prod_code = this.$route.query.prod_code;
      info.order_no = this.$route.query.order_no;
      console.log(info);
      // info.from_date = this.comInfo.write_date;

      data = {
        param: this.reviewInfo,
      };
      this.$router.push({ path: "/userProductInfo", query: { prod_code: this.reviewInfo.prod_code }  });

      return {
        method,
        data,
        url,
      };
    },
    async saveInfo() {
      if (!this.validation()) return;

      let formData = new FormData();
      this.images.forEach((file) => {
        formData.append(`files`, file);
      });
      try {
        let info = this.getInfo();
        let result = await axios(info);
        if (result.data.affectedRows > 0) {
          Swal.fire({
            icon: "success",
            title: "정상 처리",
            text: "정상적으로 처리되었습니다.",
            //바뀌지마
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "처리 실패",
            text: "정상적으로 처리되지 않았습니다.",
          });
        }
        this.bno = result.data.insertId;
        formData.append("bno", this.bno);
      } catch (err) {
        console.error(err);
      } finally {
        let res = await axios.post(`/api/qna/reviewPhoto`, formData);
        let uploadedImages = res.data.filenames;
        console.log(uploadedImages);

        this.images = uploadedImages;
      }
    },
    validation() {
      if (this.reviewInfo.review_title == "") {
        Swal.fire({
          icon: "warning",
          title: "제목이 입력되지 않았습니다.",
          confirmButtonText: "확인",
        });
        return false;
      }
      if (this.reviewInfo.review_content == "") {
        Swal.fire({
          icon: "warning",
          title: "내용이 입력되지 않았습니다.",
          confirmButtonText: "확인",
        });
        return false;
      }

      return true;
    },
  }
  
}

</script>

<style scoped>
* {
  font-family: "Gowun Dodum";
}
#show {
  height: 850px;
  margin-bottom: 80px;
  width: 900px;
  margin: 0 auto;
}
#writetable {
  width: 900px;
  border: 1px;
  border: 1px solid;
}
.title {
  background-color: #dc3545;
  opacity: 0.89;
}
#textarea {
  margin-top: 10px;
}
p {
  text-align: center;
  margin: 15px;
  color: #ffffff;
  font-weight: bolder;
}
#select {
  margin: 10px;
}
#title {
  margin: 10px;
  width: 700px;
}
#avatar {
  margin: 10px;
}
span {
  margin-left: 10px;
}
.page-title {
  margin-bottom: 60px;
}
.button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px; /* Adjust margin as needed */
}

tr {
  border: 1px solid;
}
</style>