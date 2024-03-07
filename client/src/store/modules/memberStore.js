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
            kakaoInfo : {},
            loginStatus : false,
            kakaoStatus : false
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
        setKakaoStatus(state, data) {
            state.kakaoStatus = data;
        },
        clearStore(state) {
            state.memberInfo = {};
            state.kakaoInfo = {};
            state.loginStatus = false;
            state.kakaoStatus = false;
        }
    }
};

export default memberStore;