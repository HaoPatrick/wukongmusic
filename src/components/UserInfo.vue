<template>
  <div>
    <p>name:{{userInfo.userName}}</p>
    <img :src="userInfo.avatar">
    <el-input v-model="channelName"></el-input>
    <el-button @click="changeChannel">join channel</el-button>
    <el-button @click="syncSongs">sync songs</el-button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'userinfo',
  data() {
    return {
      channelName: ''
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'userConfig'
    ])
  },
  methods: {
    ...mapActions([
      'joinChannel',
      'fetchSongList'
    ]),
    changeChannel() {
      this.joinChannel(this.channelName)
    },
    syncSongs() {
      this.fetchSongList(this.userConfig)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
