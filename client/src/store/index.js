import { createStore } from 'vuex'
import exampleStore from './modules/exampleStore'
import memberStore from './modules/memberStore'
import persistedstate from 'vuex-persistedstate'

const store = createStore ({
  modules : {
    exampleStore,
    memberStore
  },
  plugins : [
    persistedstate ({
        paths : ['memberStore']
    })
  ]
})

export default store;