import store from '../store'
import {
  loadSongList,
  setUserPre
} from '../api/localdata'

export function initClient() {
  store.dispatch('fetchUserInfo')
  store.dispatch('fetchUserConfig')
  setUserPre()
  const songList = loadSongList()
  store.commit('setSongList', songList)
}
