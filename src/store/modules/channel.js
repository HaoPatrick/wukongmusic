import {
  joinChannel
} from '../../api/index'

const state = {
  channelInfo: {},
  channelName: '',
  notification: ''
}

const getters = {
  channelInfo: state => state.channelInfo,
  channelName: state => state.channelName,
  notification: state => state.notification
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
  },
  setNotification(state, msg) {
    state.notification = msg
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
