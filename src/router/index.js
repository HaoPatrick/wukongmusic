import Vue from 'vue'
import Router from 'vue-router'
import UserInfo from '@/components/UserInfo'
import Channel from '@/components/Channel'
import Join from '@/components/Join'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
      path: '/',
      redirect: '/join'
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
    },
    {
      path: '/join',
      name: 'Join',
      component: Join
    }
  ]
})
