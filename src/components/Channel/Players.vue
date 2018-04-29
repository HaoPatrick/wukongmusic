<template>
  <section class="players">
    <div :style="{width: nowPlaying.player===user.id?'3.5em':'3em'}" v-for="(user,index) in onlineUsers" :key="index">
      <el-tooltip :visible-arrow='false' :content="user.userName" placement="top">
        <img :style="{border: nowPlaying.player===user.id?'2px solid var(--theme-color)':'none'}" width="100%" :src="user.avatar">
      </el-tooltip>
    </div>
  </section>
</template>

<script>
export default {
  name: 'hello',
  props: ['onlineUsers', 'nowPlaying'],
  data() {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
</style>
