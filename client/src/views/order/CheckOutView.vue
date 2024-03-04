
<template>
            <!-- Single Page Header start -->
            <div class="container-fluid page-header py-5">
            <h1 class="text-center text-white display-6">Checkout</h1>
            <ol class="breadcrumb justify-content-center mb-0">
                <li class="breadcrumb-item"><a href="#">Home</a></li>
                <li class="breadcrumb-item"><a href="#">Pages</a></li>
                <li class="breadcrumb-item active text-white">Checkout</li>
            </ol>
        </div>
        <!-- Single Page Header End -->


        <!-- Checkout Page Start -->
        <div class="container-fluid py-5">
            <div class="container py-5">
                <h3 class="mb-4">주문/결제</h3>

                {{checkOutList}}

                <form action="#">
                
                    <div class="row g-5">
                        <!--주문정보-->
                        <div class="col-md-12 col-lg-6 col-xl-7">

                            <!-- <div class="form-item">
                                <input type="radio" name="chk_info" class="radio-btn" checked>
                                <label class="form-label my-3" style="margin-right:10px">회원 정보와 동일</label>
                                <input type="radio" name="chk_info" class="radio-btn" @click="newInfo()">
                                <label class="form-label my-3">새로운 배송지</label>
                            </div> -->

                            <div class="form-item">
                                <label class="form-label my-3">받는사람 <sup>*</sup></label>
                                <input type="text" class="form-control" v-model="userInfo.member_name">
                            </div>



                            <div class="form-item address-box">
                                <label class="form-label my-3">주소 <sup>*</sup></label>
                                <br>
                                <input type="text" width="100px" class="post-code-input" v-model="userInfo.postcode"> <button id="postcode" @click="openPostcode()">주소검색</button>
                                <input type="text" class="form-control" v-model="userInfo.address">
                                <input type="text" class="form-control" v-model="userInfo.address_detail">
                            </div>
                            <div class="form-item">
                                <label class="form-label my-3">휴대전화<sup>*</sup></label>
                                <input type="text" class="form-control" v-model="userInfo.member_phone">
                            </div>
                            <div class="form-item">
                                <label class="form-label my-3">이메일</label>
                                <input type="text" class="form-control" v-model="userInfo.member_email">
                            </div>
                            
                            <br>
                            <div class="form-item">
                                <label class="form-label my-3">배송메모</label>
                                <textarea name="text" class="form-control" spellcheck="false" cols="30" rows="5" placeholder="배송메모 입력 (선택사항)"></textarea>
                            </div>
                        </div>
                        <div class="col-md-12 col-lg-6 col-xl-5">

                                 <OrderProducts />

                                <br>
                                <br>

                                <PaymentInfo />
                            
                            <div class="row g-4 text-center align-items-center justify-content-center pt-4">
                                <button type="button" class="btn border-secondary py-3 px-4 text-uppercase w-100 text-primary">Place Order</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <!-- Checkout Page End -->
</template>

<script>
import axios from 'axios'
import OrderProducts from '@/components/OrderProducts.vue';
import PaymentInfo from '@/components/PaymentInfo.vue';

export default {
    data(){
        return{
            checkOutList: [],

            userInfo: {
                // member_name: null,
                // postcode: null,
                // address: null,
                // address_detail: null,
                // member_phone: null,
                // member_email: null
            },

            // //우편번호 시도1
            // zonecode: "",
            // roadAddress: "",
            // detailAddress: "",

            //우편번호 시도2
            addr: {
                zip: '',
                addr1: '',
                addr2: '',
            },

        }
    },
    components: {
        OrderProducts,
        PaymentInfo
    },
    mounted() {
        this.checkOutList = JSON.parse(this.$route.query.carts);
        
        // let searchNo = this.$route.query.userId;
        this.getUserInfo('mem00001')

        
    },

    methods: {
        async getUserInfo(ucode) {
            let result = await axios.get('/apimember/' + ucode)
                        .catch(err => console.log(err));
            let info = result.data;
            this.userInfo = info;           
        },

        newInfo() {
            this.userInfo = '';
        },

        // 우편번호시도1
        // openPostcode() {
        //     new window.daum.Postcode({
        //         oncomplete: (data) => {
        //             console.log(data);
        //             this.this.zonecode = data.zonecode;
        //             this.this.roadAddress = data.roadAddress;
        //         },
        //     }).open();
        // },

        //우편번호시도2
        openPostcode() {
        new window.daum.Postcode({ 
            oncomplete: (data) => {
                let fullRoadAddr = data.roadAddress; // 도로명 주소 변수 
                let extraRoadAddr = ''; // 도로명 조합형 주소 변수

                if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                    extraRoadAddr += data.bname; 
                }

                if(data.buildingName !== '' && data.apartment === 'Y'){ 
                    extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName); 
                } // 도로명, 지번 조합형 주소가 있을 경우, 괄호까지 추가한 최종 문자열을 만든다. 

                if(extraRoadAddr !== ''){ 
                    extraRoadAddr = ' (' + extraRoadAddr + ')'; 
                } // 도로명, 지번 주소의 유무에 따라 해당 조합형 주소를 추가한다. 

                if(fullRoadAddr !== ''){ 
                    fullRoadAddr += extraRoadAddr; 
                } // 우편번호와 주소 정보를 해당 필드에 넣는다. 

                this.addr.zip = data.zonecode; //5자리 새우편번호 사용
                this.addr.addr1 = fullRoadAddr;
                
                
                // this.$refs['addr2-modal'].show() //상세 주소 입력 모달 창 보이기
            }
        }).open()
    },

        

    

    },

} //end

</script>


<style scoped>
.address-box input {
    margin-top: 5px;
}
.post-code-input {
    border: 1px solid #ccc;
    border-radius: 7px;
    padding: 5px;
}
.radio-btn {
    margin-right: 3px;
}
</style>