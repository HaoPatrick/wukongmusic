<template>
  <section class="container">
    <div class="background" :style="{background: `url(${userInfo.avatar})`}">
    </div>
    <article>
      <div><img :src='userInfo.avatar'></div>
      <div>{{userInfo.userName}}</div>
      <div>
        <el-input placeholder="Channel Name" v-model="channelName">
          <el-button @click="toChannel" slot="append" icon="el-icon-arrow-right"></el-button>
        </el-input>
      </div>
    </article>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'joinChannel',
  data() {
    return {
      channelName: ''
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  methods: {
    toChannel() {
      if (this.channelName === '') return
      this.$router.push({ path: `/channel/${this.channelName}` })
    }
  }
}
</script>

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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
}
.container article {
  width: 45%;
  text-align: center;
  margin-bottom: 8em;
}
.container article div {
  margin-bottom: 0.8em;
}
.container article img {
  border-radius: 50%;
  width: 100%;
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
  transform: scale(1.2);
}
</style>
