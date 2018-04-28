import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import UserInfo from '@/components/UserInfo'
import Channel from '@/components/Channel'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/user',
      name: 'UserInfo',
      component: UserInfo
    },
    {
      path: '/channel/:name',
      name: 'Channel',
      component: Channel
    }
  ]
})
