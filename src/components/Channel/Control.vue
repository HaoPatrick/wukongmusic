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
      'useCDN'
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
</style>
