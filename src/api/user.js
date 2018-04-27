import axios from 'axios'
import {
  backendPrefix
} from './config'

export async function fetchUserInfo() {
  try {
    return await axios.get(backendPrefix + '/api/user/userinfo', {
      withCredentials: true
    })
  } catch (error) {
    login()
  }
}

export async function fetchUserConfig() {
  try {
    return await axios.get(backendPrefix + '/api/user/configuration', {
      withCredentials: true
    })
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
