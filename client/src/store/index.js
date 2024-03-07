import { createStore } from 'vuex'
import memberStore from './modules/memberStore'
import persistedstate from 'vuex-persistedstate'

const store = createStore ({
  modules : {
    memberStore
  },
  plugins : [
    persistedstate ({
        paths : ['memberStore']
    })
  ]
})

export default store;