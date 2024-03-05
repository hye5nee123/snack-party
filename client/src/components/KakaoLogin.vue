<template>
    <a id="kakao-login-btn" @click="loginWithKakao()">
    <img src="https://k.kakaocdn.net/14/dn/btroDszwNrM/I6efHub1SN5KCJqLm1Ovx1/o.jpg" alt="카카오 로그인 버튼" />
    </a><br>
    <p id="token-result"></p>
    <button class="api-btn" @onclick="requestUserInfo()" >사용자 정보 가져오기</button>
</template>

<script>
export default {
    methods : {
        kakaoLogin() {
            window.Kakao.Auth.login({
                success : this.getKakaoAccount
            })
        },
        getKakaoAccount() {
            window.Kakao.API.request({
                url: '/v2/user/me',
                success : res => {
                    const profile_nickname = res.profile_nickname;
                    console.log(profile_nickname);
                    alert('로그인 성공!');
                },
                fail : error => {
                    console.log(error);
                }
            })
        },

        requestUserInfo() {
    window.Kakao.API.request({
      url: '/v2/user/me',
    })
      .then(function(res) {
        alert(JSON.stringify(res));
      })
      .catch(function(err) {
        alert(
          'failed to request user information: ' + JSON.stringify(err)
        );
      });
  },











        kakaoLogout() {
            window.Kakao.Auth.logout({
                url : '/v1/user/unlink',
                success : res => {
                    console.loㅎ(res);
                    alert('로그아웃 성공!');
                    // Kakao.Auth.setAccessToken(undefined);	//토큰 제거
                    sessionStorage.clear();					//세션 제거
                    localStorage.clear();
                }
            })
        },



        loginWithKakao() {
            // const params = {
            //     redirectUri : 'http://localhost:8081/kakaologin'
            // }
            // window.Kakao.Auth.authorize(params);
            window.Kakao.Auth.login({
                success : this.getKakaoAccount2
            })
        }
    }
}
</script>