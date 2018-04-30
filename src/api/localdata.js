import {
  lcUserPre,
  lcSongList
} from './config'

export function saveSongList(song) {
  localStorage.setItem(lcSongList, JSON.stringify(song))
}

export function loadSongList(song) {
  return JSON.parse(localStorage.getItem(lcSongList))
}

export function saveUserPre(preference) {
  return localStorage.setItem(lcUserPre, JSON.stringify(preference))
}

export function loadUserPre(preference) {
  return JSON.parse(localStorage.getItem(lcUserPre))
}
