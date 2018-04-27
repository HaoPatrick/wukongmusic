const state = {
  userInfo: {}
}

const getters = {
  userInfo: state => state.userInfo
}

const actions = {
  fetchUserInfo({
    commit
  }) {}
}

const mutations = {
  setUserInfo(state, userInfo) {
    state.userInfo = userInfo
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
