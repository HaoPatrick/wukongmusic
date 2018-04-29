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
    <section class="playing">
      <div class="image-container">
        <img width="100%" :src="nowPlaying.artwork?nowPlaying.artwork.file:'https://avatars3.githubusercontent.com/u/5557706?s=400&v=4'">
      </div>
    </section>
    <section class="players">
      <div :style="{width: nowPlaying.player===user.id?'3.5em':'3em'}" v-for="(user,index) in onlineUsers" :key="index">
        <el-tooltip :visible-arrow='false' :content="user.userName" placement="top">
          <img :style="{border: nowPlaying.player===user.id?'2px solid #b33939':'none'}" width="100%" :src="user.avatar">
        </el-tooltip>
      </div>
    </section>
    <section class="slider">
      <section>{{timePlayed|second2time}}</section>
      <section>
        <el-progress style="width:100%;" :show-text="false" :percentage="playedPerc" color="#b33939"></el-progress>
      </section>
      <section>{{timeTotal|second2time}}</section>
    </section>
    <section class="control">

    </section>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { getHowl } from '../client/getHowl'
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
  filters: {
    second2time(sec) {
      const second = sec % 60
      const min = Math.floor(sec / 60)
      return `${min}:${second > 10 ? second : '0' + second}`
    }
  },
  computed: {
    ...mapGetters([
      'nowPlaying',
      'onlineUsers',
      'nextSong'
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
  background: #b33939;
}
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.slider {
  padding: 0 1.3em 0 1.3em;
  margin-top: 1em;
  display: flex;
  font-size: 0.7em;
}

.slider section:nth-of-type(2) {
  min-width: 13em;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 1em 0 1em;
}

.players {
  display: flex;
  justify-content: center;
  height: 4em;
}
.players div {
  margin-left: 1em;
  transition: 1s all;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.players div img {
  border-radius: 50%;
}

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
.image-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 21em;
}
.image-container > img {
  width: 45%;
  border-radius: 50%;
  box-shadow: 0 0 0 6px #2f2f2f, 0 0 0 12px #272727, 0 0 0 18px #1f1f1f,
    0 0 0 24px #171717, 0 0 0 30px #0f0f0f, 0 0 0 36px #070707,
    0 0 0 42px #000000, 0 0 0 48px rgba(255, 255, 255, 0.05);
  animation: rotation 25s infinite linear;
}
@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.background {
  position: fixed;
  left: 0;
  right: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
  filter: blur(5em) brightness(0.3);
  background-size: 100% 100%;
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
