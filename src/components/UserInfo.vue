<template>
  <div>
    <p>name:{{userInfo.userName}}</p>
    <img :src="userInfo.avatar">
    <el-input v-model="channelName"></el-input>
    <el-button @click="changeChannel">join channel</el-button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'userinfo',
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
    ...mapActions([
      'joinChannel'
    ]),
    changeChannel() {
      this.joinChannel(this.channelName)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
