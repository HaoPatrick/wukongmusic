<template>
  <div>
    <p>name:{{userInfo.userName}}</p>
    <img :src="userInfo.avatar">
    <el-input v-model="channelName"></el-input>
    <el-button @click="changeChannel">join channel</el-button>
    <el-button @click="syncSongs">sync songs</el-button>
    <el-button @click="playNext">play next</el-button>
    <el-button @click="playMusic">play</el-button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { sendUpNext, sendEnd } from '../api'
import { Howl } from 'howler'

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
      'songList',
      'nowPlaying'
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
    },
    playMusic() {
      const self = this
      const songUrls = self.nowPlaying.musics.map(item => item.file)
      const sound = new Howl({
        src: songUrls,
        autoplay: true,
        loop: false,
        onend: async function () {
          const response = await sendEnd(self.nowPlaying)
          console.log('play ended', response)
        }
      })
      console.log(sound)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
