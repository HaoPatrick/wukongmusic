<template>
  <section class="playing">
    <div class="image-container">
      <img width="100%" :src="nowPlaying.artwork?nowPlaying.artwork.file:'https://avatars3.githubusercontent.com/u/5557706?s=400&v=4'">
    </div>
  </section>
</template>

<script>
export default {
  name: 'hello',
  props: ['nowPlaying'],
  data() {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
</style>
