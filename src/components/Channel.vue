<template>
  <div v-loading.fullscreen.lock="!nowPlaying.title" v-if="nowPlaying.title" class="container">
    <div class="background" :style="{background: `url(${nowPlaying.resource?nowPlaying.resource.cover:'https://avatars3.githubusercontent.com/u/5557706?s=400&v=4'})`}">
    </div>
    <header class="header">
      <div>
        <i @click="showMenu" class="fas fa-bars"></i>
      </div>
      <div>
        <h3>{{nowPlaying.title}}</h3>
        <p>{{nowPlaying.artist}}</p>
      </div>
    </header>
    <hr>
    <cover :nowPlaying='nowPlaying'></cover>
    <players :nowPlaying='nowPlaying' :onlineUsers='onlineUsers'></players>
    <progressbar :timePlayed='timePlayed' :timeTotal='timeTotal' :playedPerc='playedPerc'></progressbar>
    <control @muteMusic='muteMusic'></control>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { getHowl } from '../client/getHowl'
import store from '../store'
import control from './Channel/Control'
import progressbar from './Channel/ProgressBar'
import players from './Channel/Players'
import cover from './Channel/Cover'
export default {
  name: 'channel',
  data() {
    return {
      player: null,
      playedPerc: 0,
      cached: [],
      timeTotal: 0
    }
  },
  components: {
    'control': control,
    'progressbar': progressbar,
    'players': players,
    'cover': cover
  },
  computed: {
    ...mapGetters([
      'nowPlaying',
      'onlineUsers',
      'nextSong',
      'downvoted',
      'isMuted',
      'timePlayed'
    ]),
    nextHowl() {
      if (this.nextSong.title) {
        const sound = getHowl(this.nextSong)
        this.cached.push({ howl: sound, songId: this.nextSong.songId })
        return sound
      } else {
        return null
      }
    }
  },
  watch: {
    nowPlaying: function (_) {
      const sound = this.playMusic()
      this.player = sound
      return sound
    }
  },
  mounted() {
    const channelName = this.$route.params.name
    if (!channelName) {
      this.$router.push({ path: '/join' })
    }
    this.joinChannel(channelName)
    this.$notify({
      title: 'Channel',
      message: `Joined channel ${channelName}`
    })
  },
  methods: {
    ...mapActions([
      'joinChannel'
    ]),
    ...mapMutations([
      'setTimePlayed'
    ]),
    showMenu() {
      const h = this.$createElement
      this.$notify({
        title: 'oops',
        message: h({ style: 'color: teal' }, 'Patrick is working on this...')
      })
    },
    updateProgress() {
      if (this.player.playing()) {
        const played = Math.floor(this.player.seek() || 0)
        this.setTimePlayed(played)
        this.playedPerc = played * 100 / this.timeTotal
        setTimeout(() => {
          this.updateProgress()
        }, 1000)
      }
    },
    muteMusic() {
      if (this.player) {
        store.commit('setMute', !this.isMuted)
        this.player.mute(this.isMuted)
      }
    },
    playMusic() {
      const self = this
      if (self.player !== null) {
        self.player.stop()
      }
      let sound
      if (self.cached.length > 0 && self.cached[self.cached.length - 1].songId === self.nowPlaying.songId) {
        sound = self.cached.pop().howl
      } else {
        sound = getHowl(self.nowPlaying)
      }
      sound.on('play', () => {
        self.timeTotal = Math.floor(sound.duration())
        sound.seek(self.nowPlaying.elapsed)
        sound.mute(self.isMuted)
        requestAnimationFrame(() => {
          self.updateProgress()
        })
      })
      sound.on('playerror', (id, msg) => {
        console.log(id, msg)
        self.$notify({
          title: 'Play error',
          message: msg
        })
      })
      sound.play()
      this.player = sound
      return sound
    }
  }
}
</script>
<style>
.el-tooltip__popper.is-dark {
  background: var(--theme-color);
}
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  display: flex;
  flex-direction: column;
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  right: 0;
  color: rgb(255, 255, 255);
}

.container hr {
  width: 100%;
  background-image: linear-gradient(90deg, transparent, #ccc 50%, transparent);
  border: 0;
  height: 1px;
  margin: 0.2em 0 0.2em 0;
}

.background {
  position: fixed;
  left: 0;
  top: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
  filter: blur(2em) brightness(0.3);
  background-position: 50%;
  background-size: cover !important;
  transform: scale(1.5);
}
.header {
  height: 3em;
  display: flex;
  align-items: center;
  justify-content: left;
  margin-top: 0.3em;
}
.header div:nth-of-type(1) {
  min-width: 2.5em;
  display: flex;
  justify-content: center;
  font-size: 1.6em;
}
.header h3 {
  font-size: 1.2em;
  font-weight: 500;
  margin-bottom: 0.2em;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.header p {
  color: #ccc;
  font-size: 0.75em;
}
</style>
