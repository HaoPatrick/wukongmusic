<template>
  <div>
    <p>name:{{userInfo.userName}}</p>
    <img :src="userInfo.avatar">
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'userinfo',
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
