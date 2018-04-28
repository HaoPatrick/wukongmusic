import {
  fetchUserInfo,
  fetchUserConfig
} from '../../api/index'

const state = {
  userInfo: {},
  userConfig: {},
  onlineUsers: []
}

const getters = {
  userInfo: state => state.userInfo,
  userConfig: state => state.userConfig,
  onlineUsers: state => state.onlineUsers
}

const actions = {
  async fetchUserInfo({
    commit
  }) {
    const userInfo = await fetchUserInfo()
    commit('setUserInfo', userInfo)
  },
  async fetchUserConfig({
    commit
  }) {
    const config = await fetchUserConfig()
    commit('setUserConfig', config)
  }
}

const mutations = {
  setUserInfo(state, userInfo) {
    state.userInfo = userInfo
  },
  setUserConfig(state, userConfig) {
    state.userConfig = userConfig
  },
  setOnlineUsers(state, users) {
    state.onlineUsers = users
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
