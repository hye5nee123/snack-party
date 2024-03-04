<template>
  <!-- Single Page Header start -->
  <div class="container-fluid page-header py-5">
  <h1 class="text-center text-white display-6">로그인</h1>
  <ol class="breadcrumb justify-content-center mb-0">
      <li class="breadcrumb-item"><a href="/">Home</a></li>
      <li class="breadcrumb-item text-white">Login</li>
  </ol>
</div>
<!-- Single Page Header End -->
  
    <!-- Content -->

    <div class="container-xxl">
      <div class="authentication-wrapper authentication-basic container-p-y">
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
                    placeholder="Enter your email or username"
                    autofocus
                    v-model="memberInfo.id"
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
                      placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                      aria-describedby="password"
                      v-model="memberInfo.pw"
                    />
                    <span class="input-group-text cursor-pointer"><i class="bx bx-hide"></i></span>
                  </div>
                </div>
                <!-- <div class="mb-3">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="remember-me" />
                    <label class="form-check-label" for="remember-me"> Remember Me </label>
                  </div>
                </div> -->
                <div class="mb-3">
                  <button class="btn btn-primary2 d-grid w-100" type="submit" @click="memberLogin()">로그인</button>
                </div>
              <!-- </form> -->

              <p class="text-center form-label">
                <span>아이디 찾기</span>
                <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
                <a href="auth-register-basic.html">
                  <span>비밀번호 찾기</span>
                </a>
                <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
                <span>회원가입</span>
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

export default {
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
      }
    }
  },
  methods : {
    async memberLogin() {
      if(!this.validation()) return;

      let result = await axios.get('/api/member/' + this.memberInfo.id)
                    .catch(err => console.log(err));
      
      let uid = result.data.member_id;
      let upw = result.data.pw;

      if(uid == this.memberInfo.id && upw == this.memberInfo.pw) {
        alert('로그인 되었습니다.');
        this.$router.push({path : '/'})
      } else {
        alert('아이디 또는 비밀번호가 일치하지 않습니다.')
      }
    },
    validation() {
      if(this.memberInfo.id == '') {
        alert('아이디를 입력해주세요.');
        return false;
      }
      if(this.memberInfo.pw == '') {
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
</style>
