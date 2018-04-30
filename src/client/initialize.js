import store from '../store'
import {
  loadSongList,
  loadUserPre
} from '../api/localdata'

export function initClient() {
  store.dispatch('fetchUserInfo')
  store.dispatch('fetchUserConfig')
  const songList = loadSongList()
  const userPre = loadUserPre()
  console.log(userPre)
  store.commit('setSongList', songList)
}
