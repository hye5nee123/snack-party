import persistedstate from 'vuex-persistedstate'

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
            loginStatus : false
        }
    },
    mutations : {
        setMemberInfo(state, data) {
            state.memberInfo = data;
        },
        setLoginStatus(state, data) {
            state.loginStatus = data;
        }
    },
    Plugin : [
        persistedstate ({
            paths : ['memberStore']
        })
    ]
};

export default memberStore;