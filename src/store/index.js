import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import songs from './modules/songs'
import channel from './modules/channel'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    user,
    songs,
    channel
  },
  strict: debug
})
