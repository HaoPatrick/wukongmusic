import {
  joinChannel
} from '../../api/index'

const state = {
  channelInfo: {},
  channelName: ''
}

const getters = {
  channelInfo: state => state.channelInfo,
  channelName: state => state.channelName
}

const actions = {
  async joinChannel({
    commit,
    state
  }, name) {
    if (state.channelName === name) return

    const joined = await joinChannel(name)
    if (joined) {
      commit('setChannelName', name)
    }
  }
}

const mutations = {
  setChannelInfo(state, info) {
    state.channelInfo = info
  },
  setChannelName(state, name) {
    state.channelName = name
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
