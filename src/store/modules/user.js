import {
  fetchUserInfo,
  fetchUserSongList
} from '../../api/user'

const state = {
  userInfo: {},
  songList: {}
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
      fetchUserSongList(userInfo.data.id).then(songList => {
        commit('setSongList', songList.data)
      })
    })
  }
}

const mutations = {
  setUserInfo(state, userInfo) {
    state.userInfo = userInfo
  },
  setSongList(state, songList) {
    state.songList = songList
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
