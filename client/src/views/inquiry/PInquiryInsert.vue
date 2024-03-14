<template>
    <div class="container">
        <div id="show">
            <h3>상품 문의하기</h3>
        </div>
        <table>
            <tr>
                <td class>
                    <p>제목</p>
                </td>
                <td>
                    <input v-model="pInquiryInfo.title" type="text" required />
                </td>
            </tr>
            <tr>
                <td> 작성자 </td>
                <td>{{ this.$store.state.memberStore.memberInfo.member_name }}</td>
            </tr>
            <tr>
                <td>제품명</td>
                <td v-text="productInfo.product_name"> </td>
            </tr>
            <tr>
                <td>내용</td>
                <td colspan="2" id="textarea">
                    <textarea id="textarea2" cols="130" rows="15" name="content"
                        v-model="pInquiryInfo.content"></textarea>
                </td>
            </tr>
        </table>
        <div style="text-align: center">
            <button type="button" class="btn btn-outline-danger me-2 mt-2" @click="saveInfo">
                작성
            </button>
            <button type="reset" class="btn btn-danger mt-2" @click="resetInfo()">취소</button>
        </div>
    </div>
</template>
<script>
import axios from "axios";
export default {
    data() {
        return {
            pInquiryInfo: {
                title: "",
                content: "",
                member_code: this.$store.state.memberStore.memberInfo.member_code,
                product_code: this.$route.query.product_code,

            },
            productInfo: {
                product_name: ""
            }
        };
    },
    created() {
        this.getProductInfo()
    },
    methods: {
        async getProductInfo() {
            let result = await axios.get('/api/product/info/' + this.pInquiryInfo.product_code)
                .catch(err => console.log(err));
            console.log('result : ', result);
            let info = result.data;
            console.log(info);
            this.productInfo = info[0];
        },
        saveInfo() {
            // 1) 유효성 체크
            if (!this.validation()) return;
            // 2) ajax
            // 2-1) 실제 보낼 데이터 선별
            let data = this.getSendData();
            // 2-2) axios를 이용해 ajax
            axios
                .post('/api/inquiry', data)
                .then(result => {
                    // 3) 결과처리
                    let inquiry_code = result.data.inquiry_code;
                    if (inquiry_code == 0) {
                        alert(`등록되지 않았습니다.\n메세지를 확인해주세요\n${result.data.message}`)
                    } else {
                        alert(`정상적으로 등록되었습니다.`);
                        this.pInquiryInfo.inquiry_code = inquiry_code;
                    }
                })
                .catch(err => console.log(err));
        },
        validation() {
            if (this.pInquiryInfo.title == "") {
                alert('제목이 입력되지 않았습니다.');
                return false;
            }

            if (this.pInquiryInfo.content == "") {
                alert('내용이 입력되지 않았습니다.');
                return false;
            }

            return true;
        },
        getSendData() {
            let obj = this.pInquiryInfo;
            let delData = ["inquiry_code"];
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
    margin-top: 200px;
}
</style>
