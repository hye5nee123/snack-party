<template>
  <!-- Single Page Header start -->
  <div class="container-fluid page-header py-5">
  <h1 class="text-center text-white display-6">회원탈퇴</h1>
  <ol class="breadcrumb justify-content-center mb-0">
      <li class="breadcrumb-item"><a href="/">Home</a></li>
      <li class="breadcrumb-item text-white">Withdraw</li>
  </ol>
</div>
<!-- Single Page Header End -->
  
  <!-- Content -->
  <div v-show="!kakaoStatus">
    <div  v-show="!member" class="container-xxl boxsize">
      <div class="container-p-y">
        <div class="authentication-inner">
          <!-- Register -->
          <div class="card">
            <div class="card-body">

              <!-- <h4 class="mb-2 center">LOGIN</h4>
              <p class="mb-4">Please sign-in to your account and start the adventure</p> -->

              <!-- <form id="formAuthentication" class="mb-3" action="index.html" method="POST"> -->

                <div class="mb-3">
                  <label for="pw" class="form-label">비밀번호</label>
                  <input
                    type="text"
                    class="form-control"
                    id="pw"
                    name="pw"
                    placeholder="비밀번호 입력"
                    autofocus
                    v-model="pw"
                  />
                </div>
                <!-- <div class="mb-3">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="remember-me" />
                    <label class="form-check-label" for="remember-me"> Remember Me </label>
                  </div>
                </div> -->
                <div class="mb-3">
                  <button class="btn btn-primary2 d-grid login center" type="button" @click="memberLogin()">회원탈퇴</button>
                </div>
              <!-- </form> -->
            </div>
          </div>
          <!-- /Register -->
        </div>
      </div>
    </div>
  </div>
  <!-- / Content -->
  <div v-show="member">
    <div class="mb-3">
      <router-link to="/signup" class="btn btn-primary2 d-grid login center" type="button">취소</router-link>
      <button class="btn btn-primary2 d-grid login center" type="button" @click="memberUpdate()">확인</button>
    </div>
  </div>
  <div v-show="kakaoStatus">
    <div class="mb-3">
      <router-link to="/signup" class="btn btn-primary2 d-grid login center" type="button">취소</router-link>
      <button class="btn btn-primary2 d-grid login center" type="button" @click="memberUpdate2()">확인</button>
    </div>
  </div>
</template>


<script>
import axios from 'axios';

export default {
  data() {
    return {
        name : '',
        phone : '',
        id : this.$store.state.memberStore.memberInfo.member_id,
        member : false,
        pw : '',
        pw_confirm : '',
        kakaoStatus : this.$store.state.memberStore.kakaoStatus
    }
  },
  created() {
        console.log(this.$store.state.memberStore.loginStatus);
        console.log(this.$store.state.memberStore.memberInfo);
    },
  methods : {
    async memberLogin() {
      // if(!this.validation()) return;

      let data = {
        // member_name : this.name,
        // member_phone : this.phone,
        member_id : this.$store.state.memberStore.memberInfo.member_id,
        pw : this.pw
      };

      let result = await axios.post('api/member/login', data)
                    .catch(err => console.log(err));      
      if(result.data.loginStatus == '1') {
        alert('아이디 있음!')
        // this.$store.commit('setMemberInfo', result.data.member);
        // this.id = result.data.member.member_id;
        this.member = true;

      } else {
        alert('아이디 없음!')
        this.name = '';
        this.phone = '';
        this.id = '';
      }

      // if(data.member_name == this.name && data.member_phone == this.phone) {
      //   alert('로그인 되었습니다.');

        // this.$store.commit('setLoginStatus', true);
        // this.$store.commit('setMemberInfo', data);
        // console.log(this.$store.state.memberStore.loginStatus);
        // console.log(this.$store.state.memberStore.memberInfo);
        // this.$router.push({path : '/'})
      // } else {
      //   alert('이름 또는 휴대전화가 일치하지 않습니다.')
      // }
    },
    async memberUpdate() {
        // if(!this.validation()) return;

        let data = {
            param : {
              // pw : this.pw
              member_status : 'c02',
              quit_date : this.getDate()
            }
        };
        let result = await axios.put("/api/member/" + this.$store.state.memberStore.memberInfo.member_id, data)
                    .catch(err => console.log(err));
        let info = result.data.affectedRows;
        console.log(data);
        if(info > 0) {
            alert('비밀번호가 수정되었습니다.');
            this.$store.commit('clearStore');
            this.$router.push({path : '/'})
        }
    },
    validation() {
      if(this.id == '') {
        alert('아이디를 입력해주세요.');
        return false;
      }
      if(this.name == '') {
        alert('이름을 입력해주세요.');
        return false;
      }
      if(this.phone == '') {
        alert('휴대전화를 입력해주세요.');
        return false;
      }

      return true;
    },
    getDate() {
      let dateValue = new Date();
      let year = dateValue.getFullYear();
      let month = ('0' + (dateValue.getMonth() + 1)).slice(-2);
      let day = ('0' + dateValue.getDate()).slice(-2);
      return `${year}-${month}-${day}`;
    },
    async memberUpdate2() {
        // if(!this.validation()) return;

        let data = {
            param : {
              member_id : this.id + '(탈퇴)',
              member_status : 'c02',
              quit_date : this.getDate()
            }
        };
        let result = await axios.put("/api/member/" + this.$store.state.memberStore.memberInfo.member_id, data)
                    .catch(err => console.log(err));
        let info = result.data.affectedRows;
        console.log(data);
        if(info > 0) {
            alert('비밀번호가 수정되었습니다.');
            this.$store.commit('clearStore');
            this.$router.push({path : '/'})
        }
    },
  }
}
</script>

<style scoped>
.center {
    text-align: center;
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

.form-label {
    margin-bottom: .5rem;
    font-size: 0.8rem;
}

.boxsize {
  max-width: 430px
}

.login {
  width: 300px
  }

input::placeholder {
    color: #cccccc;
}
</style>
