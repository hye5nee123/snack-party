<template>
    <a id="kakao-login-btn" @click="kakaoLogin()">
    <img src="https://k.kakaocdn.net/14/dn/btroDszwNrM/I6efHub1SN5KCJqLm1Ovx1/o.jpg" alt="카카오 로그인 버튼" />
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
    created() {
        this.getMemberList();
    },
    methods : {
        kakaoLogin() {
            window.Kakao.Auth.login({
                scope : 'account_email',
                success : this.getKakaoAccount
            })
        },
        getKakaoAccount(authObj) {
            console.log(authObj);
            window.Kakao.API.request({
                url: '/v2/user/me',
                success : async res => {
                    this.$store.commit('setKakaoInfo', res);

                    for(let list of this.memberList) {
                        if(list.member_id == this.$store.state.memberStore.kakaoInfo.id) {
                            alert('로그인 되었습니다.');

                        let result = await axios.post('/api/member/' + this.$store.state.memberStore.kakaoInfo.id)
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
                            
                        this.$store.commit('setLoginStatus', true);
                        this.$store.commit('setMemberInfo', data);
                        this.$router.push({path : '/'});
                        } else {
                            this.$router.push({path : '/sociallogin'});
                        }
                    }
                },
                fail : error => {
                    console.log(error);
                }
            })
        },
        async getMemberList() {
            let result = await axios.get('/api/member')
                            .catch(err => console.log(err));
            this.memberList = result.data;
        }
    }
}
</script>