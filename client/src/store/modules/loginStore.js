import persistedState from "vuex-persistedstate";

const loginStore = {
  state () {
    return {
      user : {}
    }
  },
  mutations : {
    user(state, data) {
      state.user = data;
    }
  },
  plugins :[
    persistedState({
      paths: ['user']
    })
  ]
}

export default loginStore;