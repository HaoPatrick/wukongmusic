<template>
  <div id="app">
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import { wsMessage } from './api'
import { initClient } from './client/initialize'
export default {
  name: 'app',
  data() {
    return {
    }
  },
  mounted: function () {
    initClient()
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
  }
}
</script>

<style>
body {
  margin: 0;
  font-family: Helvetica, Arial, "PingFang SC", "Noto Sans", Roboto,
    "Microsoft Yahei", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  --theme-color: #e84118;
}
</style>
