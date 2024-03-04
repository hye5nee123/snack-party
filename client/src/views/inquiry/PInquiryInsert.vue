<template>
<div class="container">
    <div id="show">
        <div class="page-title">
        <h3 class="text-center">상품문의하기</h3>
        </div>

        <table id="writetable">
        <tr>
            <td/>img
            <td class="title"><p>{{product_name}}</p></td>
        </tr>
        <tr>
            <td class="title"><p>제목</p></td>
            <td>
            <input
                v-model="reviewInfo.review_title"
                type="text"
                required
            />
            </td>
        </tr>
           <tr>
            <td class="title"><p>디테일코드</p></td>
            <td>
            <input
                v-model="reviewInfo.detail_code"
                type="text"
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
        <tr>
            <td class="stars"><p>별점</p></td>
            <td>
            <input
                v-model="reviewInfo.stars"
                type="number" min=1 max =5
                required
            />
            </td>
        </tr>
        </table>
        <div style="text-align: center">
        <button
            type="button"
            class="btn btn-outline-danger me-2 mt-2"
            @click="saveInfo()"
        >
            작성
        </button>
        <button type="reset" class="btn btn-danger mt-2" @click="resetInfo()">취소</button>
        </div>
    </div>
</div>
</template>
<script>
import axios from "axios";
export default{ 
    data(){
        return{
            reviewInfo :{
                review_title: "",
                review_content: "",
                detail_code:"det00001",
                stars:5
            },
            member_code:"",
            
        };
    },
    methods:{
        saveInfo(){
            // 1) 유효성 체크
            if(!this.validation()) return;
            // 2) ajax
            // 2-1) 실제 보낼 데이터 선별
            let data = this.getSendData();
            // 2-2) axios를 이용해 ajax
            axios
            .post('/api/review', data)
            .then(result => {
                // 3) 결과처리
                let review_code = result.data.review_code;
                if(review_code == 0){
                    alert(`등록되지 않았습니다.\n메세지를 확인해주세요\n${result.data.message}`)
                }else{
                    alert(`정상적으로 등록되었습니다.`);
                    this.reviewInfo.review_code = review_code;
                }
            })
            .catch(err => console.log(err));        
        },
        validation(){
            if(this.reviewInfo.review_title == ""){
                alert('제목이 입력되지 않았습니다.');
                return false;
            } 

            if(this.reviewInfo.review_content == ""){
                alert('내용이 입력되지 않았습니다.');
                return false;
            }

            return true;
        },
        getSendData(){
            let obj = this.reviewInfo;
            let delData = ["review_code"];
            let newObj = {};
            let isTargeted = null;    
            for( let field in obj ){ 
                isTargeted = false;
                for(let target of delData){
                    if(field == target) {
                        isTargeted = true;
                        break;
                    }            
                }
                if(!isTargeted){
                    newObj[field] = obj[field];
                }
            }
            let sendData = {
                "param" : newObj
            } 
            return sendData;
        },
        //취소 버튼 누룰 시 페이지 전체 relode.
        resetInfo(){
            location.reload(true);
        }
    }
}
</script>
<style scoped>
    .content-wrapper {
        height: 200px
    }
    .container{
        margin-top: 200px;
    }
</style>