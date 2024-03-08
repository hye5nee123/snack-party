<template>
  <!-- Single Page Header start -->
  <div class="container-fluid page-header py-5">
  <h1 class="text-center text-white display-6">회원탈퇴</h1>
  <ol class="breadcrumb justify-content-center mb-0">
      <li class="breadcrumb-item"><a href="/">Home</a></li>
      <li class="breadcrumb-item text-white">Search Password</li>
  </ol>
</div>
<!-- Single Page Header End -->
  
    <!-- Content -->

    <div class="container-xxl boxsize">
      <div class="container-p-y">
        <div class="authentication-inner">
          <!-- Register -->
          <div class="card">
            <div class="card-body">

              <!-- <h4 class="mb-2 center">LOGIN</h4>
              <p class="mb-4">Please sign-in to your account and start the adventure</p> -->

              <!-- <form id="formAuthentication" class="mb-3" action="index.html" method="POST"> -->
                <div class="mb-3">
                  <label for="id" class="form-label">아이디</label>
                  <input
                    type="text"
                    class="form-control"
                    id="id"
                    name="email-username"
                    placeholder="아이디 입력"
                    autofocus
                    v-model="id"
                  />
                </div>
                <div class="mb-3 form-password-toggle">
                  <div class="d-flex justify-content-between">
                    <label class="form-label" for="pw">비밀번호</label>
                    <!-- <a href="auth-forgot-password-basic.html">
                      <small>Forgot Password?</small>
                    </a> -->
                  </div>
                  <div class="input-group input-group-merge">
                    <input
                      type="password"
                      id="pw"
                      class="form-control"
                      name="password"
                      placeholder="비밀번호 입력"
                      aria-describedby="password"
                      v-model="pw"
                      @keyup.enter="memberLogin()"
                    />
                    <!-- <span class="input-group-text cursor-pointer"><i class="bx bx-hide"></i></span> -->
                  </div>
                </div>
                <!-- <div class="mb-3">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="remember-me" />
                    <label class="form-check-label" for="remember-me"> Remember Me </label>
                  </div>
                </div> -->
                <div class="mb-3">
                  <button class="btn btn-primary2 d-grid login center" type="button" @click="memberLogin()">로그인</button>
                </div>
                <KakaoLogin />
              <!-- </form> -->

              <p class="text-center form-label">
                <span>아이디 찾기</span>
                <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
                <a href="auth-register-basic.html">
                  <span>비밀번호 찾기</span>
                </a>
                <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
                <router-link to="/signup">회원가입</router-link>
              </p>
            </div>
          </div>
          <!-- /Register -->
        </div>
      </div>
    </div>

    <!-- / Content -->



  </template>


<script>
import axios from 'axios';
import KakaoLogin from '../../components/KakaoLogin.vue';

export default {
  data() {
    return {
        id : '',
        pw : ''
    }
  },
  created() {
        console.log(this.$store.state.memberStore.loginStatus);
        console.log(this.$store.state.memberStore.memberInfo);
    },
  components : {
    KakaoLogin
  },
  methods : {
    async memberLogin() {
      if(!this.validation()) return;

      let result = await axios.post('api/member/' + this.id)
                    .catch(err => console.log(err));
                       
      let data = {
        member_code : result.data.member_code,
        member_id : result.data.member_id,
        pw : result.data.pw,
        member_name : result.data.member_name,
        member_phone : result.data.member_phone,
        member_email : result.data.member_email,
        birthday : result.data.birthday,
        gender : result.data.gender,
        postcode : result.data.postcode,
        member_type : result.data.member_type,
        join_date : result.data.join_date,
        address : result.data.address,
        address_detail : result.data.address_detail,
        member_status : result.data.member_status,
        quit_date : result.data.quit_date,
        token : result.data.token
      }                    

      if(data.member_id == this.id && data.pw == this.pw) {
        alert('로그인 되었습니다.');

        this.$store.commit('setLoginStatus', true);
        this.$store.commit('setMemberInfo', data);
        console.log(this.$store.state.memberStore.loginStatus);
        console.log(this.$store.state.memberStore.memberInfo);
        this.$router.push({path : '/'})
      } else {
        alert('아이디 또는 비밀번호가 일치하지 않습니다.')
      }
    },
    validation() {
      if(this.id == '') {
        alert('아이디를 입력해주세요.');
        return false;
      }
      if(this.pw == '') {
        alert('비밀번호를 입력해주세요.');
        return false;
      }

      return true;
    }
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
