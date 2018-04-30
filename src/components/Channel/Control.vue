<template>
  <section class="control">
    <div @click="downvote">
      <i v-if="downvoted.songId!==nowPlaying.songId" class="far fa-thumbs-down"></i>
      <i v-else class="far fa-thumbs-down"></i>
    </div>
    <div>
      <i class="fas fa-user-secret"></i>
    </div>
    <div v-popover:popover>
      <i class="fas fa-download"></i>
    </div>
    <div @click="toggleCDN">
      <i v-if="useCDN" class="fas fa-link"></i>
      <i v-else class="fas fa-unlink"></i>
    </div>
    <div @click="muteMusic">
      <i v-if="isMuted" class="fas fa-volume-off"></i>
      <i v-else class="fas fa-volume-up"></i>
    </div>
    <div v-popover:popover-songs>
      <i class="fab fa-elementor"></i>
    </div>
    <el-popover ref="popover-songs" placement="left" width="300" trigger="click">
      <h3>PLAYLIST ({{songList.songs.length}})
        <i @click="syncMusic" class="fas fa-sync-alt"></i>
        <i @click="unimplemented" class="fas fa-random"></i>
      </h3>
      <div class="play-container">
        <article v-for='(item,index) in songList.songs' :key="`song-${index}`">
          <div>{{item.title}} -
            <span class="artist">{{item.artist}}</span>
          </div>
          <div>
            <i @click="unimplemented" class="fas fa-arrow-up"></i>
            <i @click="unimplemented" class="far fa-trash-alt"></i>
          </div>
        </article>
      </div>
    </el-popover>

    <el-popover ref="popover" placement="top" width="200" trigger="click">
      <div>
        <h3>Download Song</h3>

        <div v-for='(item,index) in nowPlaying.musics' :key="'download'+index">
          <span>{{index}}.</span>
          <span v-if="item.audioQuality==='high'">
            [
            <i class="fab fa-superpowers"></i>HQ]
          </span>
          <span>
            <a target="_blank" :href="item.file">source</a>
          </span>
          <span v-if="item.fileViaCdn">
            <a target="_blank" :href="item.fileViaCdn">CDN</a>
          </span>
        </div>
      </div>
    </el-popover>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import store from '../../store'
export default {
  name: 'control',
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'nowPlaying',
      'downvoted',
      'isMuted',
      'useCDN',
      'songList',
      'userConfig'
    ])
  },
  methods: {
    ...mapActions([
      'toggleCDN'
    ]),
    downvote() {
      store.dispatch('downvoteCurrentSong')
    },
    muteMusic() {
      this.$emit('muteMusic')
    },
    syncMusic() {
      store.dispatch('fetchSongList', this.userConfig)
    },
    unimplemented() {
      this.$notify({
        title: 'error',
        message: 'under construction'
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.control {
  display: flex;
  justify-content: center;
  margin-top: 0.5em;
  font-size: 1.4em;
}
.control div {
  margin: 0 0.5em 0 0.5em;
  min-width: 1.5em;
  display: flex;
  justify-content: center;
}
.play-container {
  max-height: 20em;
  overflow: auto;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  margin-top: 0.2em;
}
.play-container article {
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  padding: 0.5em 0 0.5em 0;
  display: flex;
}
.play-container article div:nth-of-type(1) {
  flex-grow: 1;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.play-container article div:nth-of-type(2) {
  min-width: 2.5em;
}
.artist {
  font-size: 0.7em;
  color: #999;
}
</style>
