<template>
  <!-- Single Page Header start -->
  <div class="container-fluid page-header py-5">
  <h1 class="text-center text-white display-6">{{ this.title }}</h1>
  <ol class="breadcrumb justify-content-center mb-0">
      <li class="breadcrumb-item"><a href="/">Home</a></li>
      <li class="breadcrumb-item text-white">{{ this.path }}</li>
  </ol>
</div>
<!-- Single Page Header End -->


<!-- Checkout Page Start -->

<div class="container-fluid py-5">
    <div class="container py-5">
        <form action="#">
            <div class="row g-5 center">
                <div class="col-md-12 col-lg-6 col-xl-7">
                  <div class="info"><sup>*</sup> 필수 입력사항</div><br><br>
                  <div class="row" v-if="this.loginStatus">
                        <div class="col-md-12 col-lg-6">
                          <div class="form-item w-100 my-3">
                              <label class="bold">아이디<sup>*</sup></label>
                              <input type="text" class="form-control" placeholder="아이디 입력" id="id" v-model="memberInfo.id" readonly>
                          </div>
                      </div>
                  </div>
                  <div class="row" v-else>
                      <div class="col-md-12 col-lg-6">
                          <div class="form-item w-100">
                              <label class="bold">아이디<sup>*</sup></label>
                              <input type="text" class="form-control" placeholder="아이디 입력" id="id" v-model="memberInfo.id" autofocus>
                          </div>
                          <p class="form-label">- 5~20자, 영문 소문자(필수), 숫자만 사용 가능</p>
                      </div>
                      <div class="col-md-12 col-lg-6 my-3">
                          <div class="form-item w-100 my-3">
                              <button type="button" class="btn border-secondary px-4 text-primary" @click="checkID()">중복확인</button>
                          </div>
                      </div>
                  </div>
                  <div v-show="!this.kakaoStatus">
                        <div class="form-item col-lg-6">
                            <label class="bold">비밀번호<sup>*</sup></label>
                            <input type="password" class="form-control" placeholder="비밀번호 입력" id="pw" v-model="memberInfo.pw">
                        </div>
                        <p class="form-label">- 8~16자, 영문 대/소문자, 숫자, 특수문자(~!@#$%^&*)만 사용 가능</p>
                        <div class="form-item col-lg-6 my-3">
                            <label class="bold">비밀번호 확인<sup>*</sup></label>
                            <input type="password" class="form-control" placeholder="비밀번호 입력" id="pw_confirm" v-model="memberInfo.pw_confirm">
                        </div>
                  </div>
                  <div class="form-item col-lg-6" v-if="this.loginStatus">
                      <label class="bold">이름<sup>*</sup></label>
                      <input type="text" class="form-control" placeholder="이름 입력" id="name" v-model="memberInfo.name" readonly>
                  </div>
                  <div class="form-item col-lg-6 my-3" v-else>
                      <label class="bold">이름<sup>*</sup></label>
                      <input type="text" class="form-control" placeholder="이름 입력" id="name" v-model="memberInfo.name">
                  </div>
                  <div class="form-item col-lg-6 my-3">
                      <label class="bold">휴대전화<sup>*</sup></label>
                      <input type="text" class="form-control" placeholder="'-'없이 숫자만 입력" id="phone" v-model="memberInfo.phone">
                  </div>
                  <div class="form-item col-lg-6 my-3">
                      <label class="bold">이메일<sup>*</sup></label>
                      <input type="text" class="form-control" placeholder="이메일 입력 (예시 : email@example.com)" id="email" v-model="memberInfo.email">
                  </div>
                  <div class="row">
                      <div class="col-md-12 col-lg-6">
                          <div class="form-item w-100">
                              <label class="bold">생년월일<sup></sup></label>
                              <input type="text" class="form-control" placeholder="생년월일 8자리 (예시 : 19000101)" id="birth" v-model="memberInfo.birth">
                          </div>
                      </div>
                      <div class="col-md-12 col-lg-6">
                          <div class="form-item w-100">
                              <label class="bold">성별<sup></sup></label><br>
                                <input type="radio" class="btn-check" name="gender" id="btnradio1" autocomplete="off" value="a01" v-model="memberInfo.gender"/>
                                <label class="btn btn-outline-primary margin-right" for="btnradio1">남</label>
                                <input type="radio" class="btn-check" name="gender" id="btnradio2" autocomplete="off" value="a02" v-model="memberInfo.gender"/>
                                <label class="btn btn-outline-primary" for="btnradio2">여</label>
                          </div>
                      </div>
                  </div>
                  <div class="row">
                      <div class="col-md-12 col-lg-6 my-3">
                          <div class="form-item w-100">
                              <label class="bold">기본주소<sup>*</sup></label>
                              <input type="text" class="form-control" placeholder="우편번호" id="postcode" v-model="memberInfo.postcode" readonly>
                          </div>
                      </div>
                      <div class="col-md-12 col-lg-6">
                          <div class="form-item w-100"><br><br>
                            <div>
                                <OpenPostcode @postcode="getCode" />
                            </div>
                            <!-- <button type="button" class="btn border-secondary px-4 text-primary" @click="openPostcode()">우편번호 검색</button> -->
                          </div>
                      </div>
                  </div>
                  <div class="form-item">
                      <input type="text" class="form-control" placeholder="도로명주소" id="address" v-model="memberInfo.address" readonly>
                      <input type="text" class="form-control my-3" placeholder="상세주소" id="address_detail" v-model="memberInfo.address_detail">
                  </div>
                  <div class="row g-4 text-center align-items-center justify-content-center pt-4">
                      <button type="button" class="btn btn-primary2 border-secondary py-3 px-4 text-uppercase w-100" @click="this.loginStatus? memberUpdate() : memberInsert()">{{ this.button }}</button>
                  </div><br>
                  <div class="info" v-show="loginStatus">회원탈퇴 ></div>
              </div>
          </div>
      </form>
  </div>
</div>
<!-- Checkout Page End -->
</template>

<script>
import axios from 'axios';
import OpenPostcode from '../../components/OpenPostcode.vue';

export default {
    name: 'SignUp',
    data() {
        return {
            memberInfo : {
                id : '',
                pw : '',
                pw_confirm : '',
                name : '',
                phone : '',
                email : '',
                birth : null,
                gender : '',
                postcode : '',
                type : 'b01',
                address : '',
                address_detail : '',
                status : 'c01',
                quit_date : null,
                token : ''
            },
            memberList : [],
            check : false,
            loginStatus : false,
            kakaoStatus : false,
            shopInfo : {
                title : '',
                path : '',
                button : '',
            }
        };
    },
    created() {
        console.log(this.$store.state.memberStore.loginStatus);
        console.log(this.$store.state.memberStore.memberInfo);
        console.log(this.$store.state.memberStore.kakaoInfo);
        this.kakaoStatus = this.$store.state.memberStore.kakaoStatus;
        this.loginStatus = this.$store.state.memberStore.loginStatus;
        if(this.loginStatus > 0) {
            // 회원정보
            this.title = '회원정보'
            this.path = 'Member Info'
            this.button = '정보수정'
            this.getMemberInfo()
        } else {
            // 회원가입
            this.title = '회원가입'
            this.path = 'Sign Up'
            this.button = '가입신청'
        }
    },
    components : {
        OpenPostcode
    },
    methods : {
        async memberInsert() {
            if(!this.validation()) return;

            let data = {
                param : {
                    member_id : this.memberInfo.id,
                    pw : this.memberInfo.pw,
                    member_name : this.memberInfo.name,
                    member_phone : this.memberInfo.phone,
                    member_email : this.memberInfo.email,
                    birthday : this.memberInfo.birth,
                    gender : this.memberInfo.gender,
                    postcode : this.memberInfo.postcode,
                    member_type : this.memberInfo.type,
                    address : this.memberInfo.address,
                    address_detail : this.memberInfo.address_detail,
                    member_status : this.memberInfo.status,
                    quit_date : this.memberInfo.quit_date,
                    token : this.memberInfo.token
                }
            };
            let result = await axios.post("/api/member", data)
                        .catch(err => console.log(err));
            let info = result.data.affectedRows;
            if(info > 0) {
                alert('회원가입이 완료되었습니다.');
                this.$router.push({path : '/login'})
            }
        },
        async memberUpdate() {
            if(!this.validation()) return;

            let data = {
                param : {
                    member_id : this.memberInfo.id,
                    pw : this.memberInfo.pw,
                    member_name : this.memberInfo.name,
                    member_phone : this.memberInfo.phone,
                    member_email : this.memberInfo.email,
                    birthday : this.memberInfo.birth,
                    gender : this.memberInfo.gender,
                    postcode : this.memberInfo.postcode,
                    member_type : this.memberInfo.type,
                    address : this.memberInfo.address,
                    address_detail : this.memberInfo.address_detail,
                    member_status : this.memberInfo.status,
                    quit_date : this.memberInfo.quit_date,
                    token : this.memberInfo.token
                }
            };
            let result = await axios.put("/api/member/" + this.memberInfo.id, data)
                        .catch(err => console.log(err));
            let info = result.data.affectedRows;
            if(info > 0) {
                alert('회원정보가 수정되었습니다.');
                this.$router.push({path : '/'})
            }
        },
        validation() {
            if(!this.loginStatus) {
                if(this.memberInfo.id == '') {
                    alert('아이디를 입력해주세요.');
                    return false;
                }
                if(this.memberInfo.name == '') {
                alert('이름을 입력해주세요.');
                return false;
                }
                if(!(/^(?=.*[a-z])[a-z0-9]{5,20}$/g.test(this.memberInfo.id))) {
                alert('아이디는 5~20자, 영문 소문자(필수), 숫자만 사용 가능합니다.');
                return false;
                }
                if(!this.check) {
                alert('아이디 중복확인을 해주세요.');
                return false;
                }
            }
            if(!this.kakaoStatus) {
                if(this.memberInfo.pw == '') {
                alert('비밀번호를 입력해주세요.');
                return false;
                }
                if(this.memberInfo.pw_confirm == '') {
                    alert('비밀번호 확인을 입력해주세요.');
                    return false;
                }
                if(!(/^[a-zA-Z0-9~!@#$%^&*]{8,16}$/g.test(this.memberInfo.pw))) {
                    alert('비밀번호는 8~16자, 영문 대/소문자, 숫자, 특수문자(~!@#$%^&*)만 사용 가능합니다.');
                    return false;
                }
                if(!(this.memberInfo.pw == this.memberInfo.pw_confirm)) {
                    alert('비밀번호가 일치하지 않습니다.');
                    return false;
                }
            }
            if(this.memberInfo.phone == '') {
                alert('휴대전화를 입력해주세요.');
                return false;
            }
            if(this.memberInfo.email == '') {
                alert('이메일을 입력해주세요.');
                return false;
            }
            if(this.memberInfo.postcode == '') {
                alert('기본주소를 입력해주세요.');
                return false;
            }
            if(this.memberInfo.address_detail == '') {
                alert('상세주소를 입력해주세요.');
                return false;
            }

            return true;
        },
        // openPostcode() {
        //     new window.daum.Postcode({
        //         oncomplete : (data) => {
        //             this.memberInfo.postcode = data.zonecode;
        //             this.memberInfo.address = data.roadAddress;
        //         }
        //     }).open();
        // },
        getCode(zonecode, roadAddress) {
            this.memberInfo.postcode = zonecode;
            this.memberInfo.address = roadAddress;
        },
        async checkID() {
            if(this.memberInfo.id == '') {
                alert('아이디를 입력해주세요.');
                return false;
            } else { 
                let result = await axios.post('/api/member/' + this.memberInfo.id)
                            .catch(err => console.log(err));
                let info = result.data.member_id;
                
                if(info == this.memberInfo.id) {
                    alert('해당 아이디는 사용 중입니다.');
                    return false;
                } else {
                    alert('사용 가능한 아이디입니다.');
                    this.check = true;
                    return true;
                }
            }
        },
        getMemberInfo() {
            this.memberInfo.id = this.$store.state.memberStore.memberInfo.member_id;
            this.memberInfo.name = this.$store.state.memberStore.memberInfo.member_name;
            this.memberInfo.phone = this.$store.state.memberStore.memberInfo.member_phone;
            this.memberInfo.email = this.$store.state.memberStore.memberInfo.member_email;
            this.memberInfo.birth = this.getDate(this.$store.state.memberStore.memberInfo.birthday);
            this.memberInfo.gender = this.$store.state.memberStore.memberInfo.gender;
            this.memberInfo.postcode = this.$store.state.memberStore.memberInfo.postcode;
            this.memberInfo.type = this.$store.state.memberStore.memberInfo.member_type;
            this.memberInfo.address = this.$store.state.memberStore.memberInfo.address;
            this.memberInfo.address_detail = this.$store.state.memberStore.memberInfo.address_detail;
        },
        getDate(date) {
            let dateValue = date == null ? new Date() : new Date(date);
            let year = dateValue.getFullYear();
            let month = ('0' + (dateValue.getMonth() + 1)).slice(-2);
            let day = ('0' + dateValue.getDate()).slice(-2);
            return `${year}-${month}-${day}`;
        }
    }
}
</script>

<style scoped>
.center {
    justify-content: center
}

sup {
    color: red
}

.bold {
    font-weight: 700;
    margin-bottom: .5rem;
    font-size: .9rem;
}

.margin-right {
    margin-right: 0.5rem;
}

input::placeholder {
    color: #cccccc;
}

input:read-only {
    background-color: #eeeeee;
}

.page-header {
    position: relative;
    background: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(../../assets/img/snack.jpg);
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
}

.breadcrumb-item+.breadcrumb-item::before {
    float: left;
    padding-right: .5rem;
    color: #fd7e14;
    content: var(--bs-breadcrumb-divider, "/")
        /* rtl: var(--bs-breadcrumb-divider, "/") */
}

.info {
    float: right;
    font-size: .9rem;
}

.small {
    font-size: .9rem;
}
</style>