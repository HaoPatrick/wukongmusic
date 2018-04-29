<template>
  <div v-if="nowPlaying.title" class="container">
    <div class="background" :style="{background: `url(${nowPlaying.artwork?nowPlaying.artwork.file:'https://avatars3.githubusercontent.com/u/5557706?s=400&v=4'})`}">
    </div>
    <header class="header">
      <div>
        <h3>{{nowPlaying.title}}</h3>
        <p>{{nowPlaying.artist}}</p>
      </div>
    </header>
    <cover :nowPlaying='nowPlaying'></cover>
    <players :nowPlaying='nowPlaying' :onlineUsers='onlineUsers'></players>
    <progressbar :timePlayed='timePlayed' :timeTotal='timeTotal' :playedPerc='playedPerc'></progressbar>
    <control @muteMusic='muteMusic'></control>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { getHowl } from '../client/getHowl'
import store from '../store'
import control from './Channel/Control'
import progressbar from './Channel/Progressbar'
import players from './Channel/Players'
import cover from './Channel/Cover'
export default {
  name: 'channel',
  data() {
    return {
      player: null,
      playedPerc: 0,
      cached: [],
      timePlayed: 0,
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
      'isMuted'
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
    updateProgress() {
      if (this.player.playing()) {
        const perc = (this.player.seek() || 0) * 100 / this.player.duration()
        this.timePlayed = Math.floor(this.player.seek() || 0)
        this.playedPerc = perc
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
  width: 100%;
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  right: 0;
  color: rgb(245, 245, 245);
}

.background {
  position: fixed;
  left: 0;
  right: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
  filter: blur(4em) brightness(0.2);
  background-size: 100% auto;
  background-position: center;
  background-repeat: no-repeat;
}
.header {
  height: 3em;
  padding-left: 3em;
  display: flex;
  align-items: center;
  justify-content: left;
  border-bottom: 1px solid #ccc;
}
.header h3 {
  font-size: 1.2em;
}
.header p {
  color: #ccc;
  font-size: 0.75em;
}
</style>
