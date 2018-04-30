import {
  lcUseCDN,
  lcMuted,
  lcSongList
} from './config'

import store from '../store'

export function saveSongList(song) {
  localStorage.setItem(lcSongList, JSON.stringify(song))
}

export function loadSongList(song) {
  return JSON.parse(localStorage.getItem(lcSongList))
}

export function updateMuted(mute) {
  return localStorage.setItem(lcMuted, mute ? 'true' : 'false')
}

export function updateCDN(cdn) {
  return localStorage.setItem(lcUseCDN, cdn ? 'true' : 'false')
}

export function loadMuted() {
  return localStorage.getItem(lcMuted) === 'true'
}
export function loadCDN() {
  return localStorage.getItem(lcUseCDN) === 'true'
}

export function setUserPre(preference) {
  store.commit('setCDN', loadCDN())
  store.commit('setMute', loadMuted())
}
