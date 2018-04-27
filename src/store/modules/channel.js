const state = {
  channelInfo: {},
  channelName: ''
}

const getters = {
  channelInfo: state => state.channelInfo,
  channelName: state => state.channelName
}

const actions = {

}

const mutations = {
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
