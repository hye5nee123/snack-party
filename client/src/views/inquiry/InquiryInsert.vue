<template>
    <div class="container">
        <div id="show">
            <h3>문의하기</h3>
        </div>
        <table>
            <tr>
                <td class>
                    <p>제목</p>
                </td>
                <td>
                    <input v-model="InquiryInfo.title" type="text" required />
                </td>
            </tr>
            <tr>
                <td> 작성자 </td>
                <td>{{ this.$store.state.memberStore.memberInfo.member_name }}</td>
            </tr>
            <tr>
                <td>문의유형</td>
                <select v-model="InquiryInfo.p_inquiry_type">
                    <option value="취소/교환/반품">취소/교환/반품</option>
                    <option value="회원정보">회원정보</option>
                    <option value="배송">배송</option>
                    <option value="주문/결제">주문/결제</option>
                    <option value="서비스/오류/기타">서비스/오류/기타</option>
                </select>
            </tr>
            <tr>
                <td>내용</td>
                <td colspan="2" id="textarea">
                    <textarea id="textarea2" cols="130" rows="15" name="content"
                        v-model="InquiryInfo.content"></textarea>
                </td>
            </tr>
            <tr>
                <td>
                    <p>첨부</p>
                </td>
                <td>
                    <input type="file" ref="fileInput" @change="handleFileChange" multiple />
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
            InquiryInfo: {
                p_inquiry_type: "",
                title: "",
                content: "",
                member_code: this.$store.state.memberStore.memberInfo.member_code
            }
        };
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
                .post(`/api/inquiry/member/${this.$store.state.memberStore.memberInfo.member_code}`, data)
                .then(result => {
                    // 3) 결과처리
                    let inquiry_code = result.data.inquiry_code;
                    if (inquiry_code == 0) {
                        alert(`등록되지 않았습니다.\n메세지를 확인해주세요\n${result.data.message}`)
                    } else {
                        alert(`정상적으로 등록되었습니다.`);
                        this.InquiryInfo.inquiry_code = inquiry_code;
                    }
                })
                .catch(err => console.log(err));
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

            return true;
        },
        getSendData() {
            let obj = this.InquiryInfo;
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
