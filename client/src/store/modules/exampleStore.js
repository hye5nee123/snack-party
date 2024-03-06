const exampleStore = {
  state () {
    return {
      currPage : 1
    }
  },
  getters : {
  },
  mutations : {
    setCurrPage(state, data) {
      state.currPage = data;
  },
  },
  actions : {
  }
}

export default exampleStore;