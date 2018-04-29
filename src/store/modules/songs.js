import {
  fetchUserSongList
} from '../../api/index'

const state = {
  songList: [],
  nowPlaying: {},
  nextSong: {}
}

const getters = {
  songList: state => state.songList,
  nowPlaying: state => state.nowPlaying,
  nextSong: state => state.nextSong
}

const actions = {
  async fetchSongList({
    commit
  }, config) {
    const urls = config.syncPlaylists.split('\n').filter(line => line)
    if (urls.length === 0) return
    const data = await Promise.all(urls.map(url =>
      fetchUserSongList(url, config.cookie)
    ))
    console.log(data)
    const songs = [].concat(...data.map(item => item.songs || []))
    commit('setSongList', songs)
  }
}

const mutations = {
  setSongList(state, songList) {
    state.songList = songList
  },
  setNowPlaying(state, song) {
    state.nowPlaying = song
  },
  setNextSong(state, song) {
    state.nextSong = song
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
