<template>
  <section class="slider">
    <section>{{timePlayed|second2time}}</section>
    <section>
      <el-progress style="width:100%;" :show-text="false" :percentage="playedPerc" color="var(--theme-color)"></el-progress>
    </section>
    <section>{{timeTotal|second2time}}</section>
  </section>
</template>

<script>
export default {
  name: 'progressbar',
  props: ['playedPerc', 'timePlayed', 'timeTotal'],
  data() {
    return {
    }
  },
  filters: {
    second2time(sec) {
      const second = sec % 60
      const min = Math.floor(sec / 60)
      return `${min}:${second > 9 ? second : '0' + second}`
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.slider {
  padding: 0 1.3em 0 1.3em;
  margin-top: 2em;
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
  padding: 0 0.6em 0 0.6em;
}
</style>
