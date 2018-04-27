import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import UserInfo from '@/components/UserInfo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/user',
      name: 'UserInfo',
      component: UserInfo
    }
  ]
})
