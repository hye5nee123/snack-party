import { createStore } from 'vuex'
import exampleStore from './modules/exampleStore'
import loginStore from './modules/exampleStore'


const store = createStore({
  modules : {
    exampleStore,
    loginStore
  },
})

export default store;