const memberStore = {
    state() {
        return {
            memberInfo : {
                member_code : '',
                member_id : '',
                pw : '',
                member_name : '',
                member_phone : '',
                member_email : '', 
                birthday : null, 
                gender : '', 
                postcode : '',
                member_type : '',
                join_date : null,
                address : '',
                address_detail : '', 
                member_status : '',
                quit_date : null,
                token : ''                
            },
            kakaoInfo : {
                email : '',
                name : ''
            },
            loginStatus : false,
        }
    },
    mutations : {
        setMemberInfo(state, data) {
            state.memberInfo = data;
        },
        setKakaoInfo(state, data) {
            state.kakaoInfo = data;
        },
        setLoginStatus(state, data) {
            state.loginStatus = data;
        },
        clearStore(state) {
            state.memberInfo = {};
            state.loginStatus = false;
        }
    }
};

export default memberStore;