<template>
  <div id="app">
    <main>
      <router-view></router-view>
    </main>
    <el-input v-model="channel"></el-input>
    <el-button @click="login">login</el-button>
    <el-button @click="getUserInfo">userInfo</el-button>
    <el-button @click="config">config</el-button>
  </div>
</template>

<script>
import axios from 'axios'
// import request from 'aa'
const backEndPrefix = 'https://wukong.leeleo.me'
export default {
  name: 'app',
  data() {
    return {
      channel: '',
      userInfo: {}
    }
  },
  mounted: function () {
    this.getUserInfo()
  },
  methods: {
    config: function () {
      axios(`${backEndPrefix}/api/channel/join/${this.channel}`, {
        method: 'POST',
        withCredentials: true
      }).then(response => {
        console.log(response)
      })
    },
    getUserInfo: function () {
      let self = this
      axios.get(backEndPrefix + '/api/user/userinfo', {
        withCredentials: true
      }).then(response => {
        console.log(response.data)
      }).catch(_ => {
        self.login()
      })
    },
    login: function () {
      axios.get(backEndPrefix + '/oauth/all')
        .then(response => {
          let oauthMethod = response.data[0]
          location.href = backEndPrefix + oauthMethod.url +
            `?redirectUri=${encodeURIComponent(location.href)}`
        })
        .catch(error => {
          this.$notify.error({
            title: 'Error',
            message: error
          })
        })
    }
  }
}
</script>

<style>
body {
  margin: 0;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

main {
  text-align: center;
  margin-top: 40px;
}
</style>
