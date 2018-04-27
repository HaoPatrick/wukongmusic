import {
  fetchUserInfo,
  fetchUserConfig
} from '../../api/index'

const state = {
  userInfo: {},
  userConfig: {}
}

const getters = {
  userInfo: state => state.userInfo
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
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
