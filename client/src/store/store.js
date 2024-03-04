import { createStore } from 'vuex'
import exampleStore from './modules/exampleStore'

const store = createStore({
  modules : {
    exampleStore,
  }
})

export default store;