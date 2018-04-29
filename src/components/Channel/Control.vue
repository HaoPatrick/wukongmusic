<template>
  <section class="control">
    <div @click="downvote">
      <i v-if="downvoted.songId!==nowPlaying.songId" class="far fa-thumbs-down"></i>
      <i v-else class="far fa-thumbs-down"></i>
    </div>
    <div>
      <i class="fas fa-user-secret"></i>
    </div>
    <div>
      <i class="fas fa-download"></i>
    </div>
    <div>
      <i class="fas fa-link"></i>
    </div>
    <div @click="muteMusic">
      <i v-if="isMuted" class="fas fa-volume-off"></i>
      <i v-else class="fas fa-volume-up"></i>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
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
      'isMuted'
    ])
  },
  methods: {
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
  margin-top: 0.8em;
  font-size: 1.4em;
}
.control div {
  margin: 0 0.5em 0 0.5em;
  min-width: 1.5em;
}
</style>
