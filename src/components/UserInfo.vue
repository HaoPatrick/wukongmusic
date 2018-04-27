<template>
  <div>
    <p>name:{{userInfo.userName}}</p>
    <img :src="userInfo.avatar">
    <el-input v-model="channelName"></el-input>
    <el-button @click="changeChannel">join channel</el-button>
    <el-button @click="syncSongs">sync songs</el-button>
    <el-button @click="playNext">play next</el-button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { sendUpNext } from '../api/index'
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
      'userConfig',
      'songList'
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
    },
    async playNext() {
      const nextSong = this.songList[0]
      const encodedSong = {
        siteId: nextSong.siteId,
        songId: nextSong.songId
      }
      const rv = await sendUpNext(encodedSong, this.userConfig.cookie)
      console.log(rv)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
