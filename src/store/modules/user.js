import {
  fetchUserInfo
} from '../../api/user'

const state = {
  userInfo: {}
}

const getters = {
  userInfo: state => state.userInfo
}

const actions = {
  fetchUserInfo({
    commit
  }) {
    fetchUserInfo().then(userInfo => {
      commit('setUserInfo', userInfo.data)
    })
  }
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
