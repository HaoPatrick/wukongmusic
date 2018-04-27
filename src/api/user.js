import axios from 'axios'
import {
  backendPrefix
} from './config'

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

export async function fetchUserSongList(id) {
  try {
    return await axios.get(backendPrefix + '/api/user/songList/' + id, {
      withCredentials: true
    })
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
