import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import UserCard from '@/components/UserCard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'UserCard',
      component: UserCard
    }
  ]
})
