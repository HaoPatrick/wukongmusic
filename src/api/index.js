import axios from 'axios'
import {
  backendPrefix,
  wsPrefix
} from './config'

import {
  ws
} from './ws'

import store from '../store'

export async function fetchUserInfo() {
  try {
    const userInfo = await axios.get(backendPrefix + '/api/user/userinfo', {
      withCredentials: true
    })
    return userInfo.data
  } catch (error) {
    login()
  }
}

export async function fetchUserConfig() {
  try {
    const userConfig = await axios.get(backendPrefix + '/api/user/configuration', {
      withCredentials: true
    })
    return userConfig.data
  } catch (error) {
    console.log(error)
  }
}

export async function fetchUserSongList(url, cookie) {
  try {
    const response = await axios.post(backendPrefix + '/provider/songListWithUrl', {
      url,
      withCookie: cookie
    }, {
      withCredentials: true
    })
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export async function sendUpNext(song, cookie = null) {
  try {
    const response = await axios.post(backendPrefix + '/api/channel/updateNextSong', {
      ...song,
      withCookie: cookie
    }, {
      withCredentials: true
    })
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export async function sendDownvote(song) {
  try {
    const response = await axios.post(backendPrefix + '/api/channel/downvote', song, {
      withCredentials: true
    })
    return response
  } catch (error) {
    console.log(error)
  }
}

export async function joinChannel(name) {
  try {
    const response = await axios.post(backendPrefix + `/api/channel/join/${name}`, {}, {
      withCredentials: true
    })
    return response.status === 204
  } catch (error) {
    console.log(error)
  }
}

export async function login() {
  try {
    const response = await axios.get(backendPrefix + '/oauth/all')
    const oauthMethod = response.data[0]
    location.href = backendPrefix + oauthMethod.url +
      `?redirectUri=${encodeURIComponent(location.href)}`
  } catch (error) {
    console.log(error)
  }
}

export async function sendEnd(nowPlaying) {
  try {
    const response = await axios.post(backendPrefix + '/api/channel/finished',
      nowPlaying.songId ? nowPlaying : null, {
        withCredentials: true
      }
    )
    return response
  } catch (error) {
    console.log(error)
  }
}

// TODO: split the api call and the state management
export function wsMessage(callBack) {
  ws(wsPrefix + '/api/ws', (connect, ping) => {
    let interval
    return (event, data) => {
      switch (event) {
        case 'open':
          {
            interval = window.setInterval(ping, 30 * 1000)
            callBack('connected')
            break
          }
        case 'close':
          {
            window.clearInterval(interval)
            callBack('disconnected')
            break
          }
        case 'error':
          break
        case 'UserListUpdated':
          {
            const users = data.users
            store.commit('setOnlineUsers', users)
            break
          }
        case 'Play':
          {
            const song = data.song && {
              ...data.song,
              player: data.user || '',
              elapsed: data.elapsed,
              channel: data.channelId,
              downvote: data.downvote
            }
            store.commit('setNewSong', song)
            break
          }
        case 'Preload':
          {
            const song = data.song
            console.log(data)
            store.commit('setNextSong', song)
            break
          }
        case 'Notification':
          {
            store.commit('setNotificiation', data.notification)
            callBack('notification')
            break
          }
        case 'Disconnect':
          {
            console.log(data.cause)
            break
          }
      }
    }
  })
}
