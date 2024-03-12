<template>
    <a id="kakao-login-btn" @click="kakaoLogin()">
    <img src="../assets/img/kakao_login_medium_wide.png" alt="카카오 로그인 버튼"/>
    </a>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            memberList : []
        }
    },
    methods : {
        kakaoLogin() {
            window.Kakao.Auth.login({
                scope : 'account_email',
                success : this.getKakaoAccount,
            })
        },
        getKakaoAccount(authObj) {
            console.log(authObj);
            window.Kakao.API.request({
                url: '/v2/user/me',
                // prompt : 'login',
                success : async res => {
                    this.$store.commit('setKakaoInfo', res);

                    let result = await axios.get('/api/member/info/' + res.id)
                            .catch(err => console.log(err));
                    let info = result.data.member_id;

                    if(info == res.id) {
                        alert('로그인 되었습니다.');
                                
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
                        
                        this.$store.commit('setLoginStatus', true);
                        this.$store.commit('setKakaoStatus', true);
                        this.$store.commit('setMemberInfo', data);
                        this.$router.push({path : '/'});
                    } else {
                        this.$router.push({path : '/sociallogin'});
                    }
                },
                fail : error => {
                    console.log(error);
                }
            })
        }
    }
}
</script>