import {
  fetchUserSongList,
  sendDownvote
} from '../../api/index'

const state = {
  songList: [],
  nowPlaying: {},
  nextSong: {},
  downvoted: {},
  useCDN: false,
  timePlayed: 0
}

const getters = {
  songList: state => state.songList,
  nowPlaying: state => state.nowPlaying,
  nextSong: state => state.nextSong,
  downvoted: state => state.downvoted,
  useCDN: state => state.useCDN,
  timePlayed: state => state.timePlayed
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
  },
  async downvoteCurrentSong({
    commit,
    state
  }) {
    const data = await sendDownvote(state.nowPlaying)
    console.log(data)
    commit('setDownvoted', state.nowPlaying)
  },
  toggleCDN({
    commit,
    state
  }) {
    commit('setCDN', !state.useCDN)
    commit('setNowPlaying', state.nowPlaying)
  }
}

const mutations = {
  setSongList(state, songList) {
    state.songList = songList
  },
  setNowPlaying(state, song) {
    state.nowPlaying = encodeSong(song)
  },
  setNewSong(state, song) {
    state.timePlayed = 0
    state.downvoted = {}
    state.nowPlaying = encodeSong(song)
  },
  setNextSong(state, song) {
    state.nextSong = encodeSong(song)
  },
  setDownvoted(state, song) {
    state.downvoted = song
  },
  setCDN(state, cdn) {
    state.useCDN = cdn
  },
  setTimePlayed(state, time) {
    state.timePlayed = time
  }
}

function encodeSong(song) {
  const musicUrls = song.musics.map(item => state.useCDN ? item.fileViaCdn : item.file)
  song.elapsed = state.timePlayed !== 0 ? state.timePlayed : song.elapsed
  song = {
    ...song,
    resource: {
      cover: state.useCDN ? song.artwork.fileViaCdn : song.artwork.file,
      music: musicUrls
    }
  }
  return song
}

export default {
  state,
  getters,
  actions,
  mutations
}
