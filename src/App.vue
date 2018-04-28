<template>
  <div id="app">
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { wsMessage } from './api'
export default {
  name: 'app',
  data() {
    return {
    }
  },
  mounted: function () {
    this.fetchUserInfo()
    this.fetchUserConfig()
    wsMessage(async event => {
      try {
        switch (event) {
          case 'connected':
            {
              this.$notify({
                title: 'WebSocket',
                message: 'Websocket connected, sending next song to server...'
              })
              break
            }
          case 'interrupted': {
            this.$notify({
              title: 'WebSocket',
              message: 'Websocket interrupted, reconnecting'
            })
            break
          }
          case 'disconnected': {
            this.$notify({
              title: 'WebSocket',
              message: 'Websocket disconnected'
            })
            break
          }
          case 'notification': {
            this.$notify({
              title: 'Server',
              message: 'server message'
            })
          }
        }
      } catch (error) {
        this.$notify(error.message)
      }
    })
  },
  methods: {
    ...mapActions([
      'fetchUserInfo',
      'fetchUserConfig'
    ])
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
}
</style>
