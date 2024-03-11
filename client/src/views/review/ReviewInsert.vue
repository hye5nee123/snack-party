<template>
    <div class="container">
        <div id="show">
            <div class="page-title">
                <h3 class="text-center">review</h3>
            </div>
            <!-- <OrderProducts :checkOutList="checkout"/>
            {{ OrderProducts }} -->
            <table id="writetable">
                <tr>
                    <td class="title">
                        <p>작성자</p>
                    </td>
                    <td>
                        <span>{{ this.$store.state.memberStore.memberInfo.member_name }}</span>
                    </td>
                </tr>
                <tr>
                    <td class="title">
                        <p>제목</p>
                    </td>
                    <td>
                        <input v-model="reviewInfo.review_title" type="text" required />
                    </td>
                </tr>
                <tr>
                    <td class="title">
                        <p>첨부</p>
                    </td>
                    <td>
                        <input type="file" ref="fileInput" @change="handleFileChange" multiple />
                    </td>
                </tr>
                <tr>
                    <td colspan="2" id="textarea">
                        <textarea id="textarea2" cols="130" rows="15" name="content"
                            v-model="reviewInfo.review_content"></textarea>
                    </td>
                </tr>
                <tr>
                    <td class="stars">
                        <p>별점</p>
                    </td>
                    <div class="star-rating space-x-4 mx-auto">
   <input type="radio" id="5-stars" name="rating" value="5" v-model="ratings"/>
   <label for="5-stars" class="star pr-4">★</label>
   <input type="radio" id="4-stars" name="rating" value="4" v-model="ratings"/>
   <label for="4-stars" class="star">★</label>
   <input type="radio" id="3-stars" name="rating" value="3" v-model="ratings"/>
   <label for="3-stars" class="star">★</label>
   <input type="radio" id="2-stars" name="rating" value="2" v-model="ratings"/>
   <label for="2-stars" class="star">★</label>
   <input type="radio" id="1-star" name="rating" value="1" v-model="ratings" />
   <label for="1-star" class="star">★</label>
    </div>
                </tr>
            </table>
            <div style="text-align: center">
                <button type="button" class="btn btn-outline-danger me-2 mt-2" @click="saveInfo()">
                    작성
                </button>
                <button type="reset" class="btn btn-danger mt-2" @click="resetInfo()">취소</button>
            </div>
        </div>
    </div>
</template>
<script>
import axios from "axios";
// import OrderProducts from '@/components/OrderProducts.vue';

export default {
    data() {
        return {
            reviewInfo: {
                member_code: this.$store.state.memberStore.memberInfo.member_code,
                review_title: "",
                review_content: "",
                detail_code: this.$route.query.detail_code,
                stars: 5
            },
            checkout:this.$route.query.checkout,

        };
    },
      components: {
    // OrderProducts
  },
    methods: {
        saveInfo() {
            // 1) 유효성 체크
            if (!this.validation()) return;
            // 2) ajax
            // 2-1) 실제 보낼 데이터 선별
            let data = this.getSendData();
            // 2-2) axios를 이용해 ajax
            axios
                .post('/api/review', data)
                .then(result => {
                    // 3) 결과처리
                    let review_code = result.data.review_code;
                    if (review_code == 0) {
                        alert(`등록되지 않았습니다.\n메세지를 확인해주세요\n${result.data.message}`)
                    } else {
                        alert(`정상적으로 등록되었습니다.`);
                        this.reviewInfo.review_code = review_code;
                    }
                })
                .catch(err => console.log(err));
        },
        validation() {
            if (this.reviewInfo.review_title == "") {
                alert('제목이 입력되지 않았습니다.');
                return false;
            }

            if (this.reviewInfo.review_content == "") {
                alert('내용이 입력되지 않았습니다.');
                return false;
            }

            return true;
        },
        getSendData() {
            let obj = this.reviewInfo;
            let delData = ["review_code"];
            let newObj = {};
            let isTargeted = null;
            for (let field in obj) {
                isTargeted = false;
                for (let target of delData) {
                    if (field == target) {
                        isTargeted = true;
                        break;
                    }
                }
                if (!isTargeted) {
                    newObj[field] = obj[field];
                }
            }
            let sendData = {
                "param": newObj
            }
            return sendData;
        },
        //취소 버튼 누룰 시 페이지 전체 relode.
        resetInfo() {
            location.reload(true);
        }
    }
}
</script>
<style scoped>
.content-wrapper {
    height: 200px
}
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh; /* Adjust as needed */
    margin-top: 200px;
}
.star-rating {
  display: flex;
  flex-direction: row-reverse;
  font-size: 2.25rem;
  line-height: 2.5rem;
  justify-content: space-around;
  padding: 0 0.2em;
  text-align: center;
  width: 5em;
}
 
.star-rating input {
  display: none;
}
 
.star-rating label {
  -webkit-text-fill-color: transparent; /* Will override color (regardless of order) */
  -webkit-text-stroke-width: 2.3px;
  -webkit-text-stroke-color: #2b2a29;
  cursor: pointer;
}
 
.star-rating :checked ~ label {
  -webkit-text-fill-color: gold;
}
 
.star-rating label:hover,
.star-rating label:hover ~ label {
  -webkit-text-fill-color: #fff58c;
}
</style>
