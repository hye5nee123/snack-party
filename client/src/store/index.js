import { createStore } from 'vuex'
import exampleStore from './modules/exampleStore'
import memberStore from './modules/memberStore'

const store = createStore({
  modules : {
    exampleStore,
    memberStore
  }
})

export default store;