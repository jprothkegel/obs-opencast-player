import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import VideoJS from './views/VideoJS.vue'
import Portal from './views/Portal.vue'
import ODVideo from './views/ODVideo.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      redirect: '/portal'
    },
    {
      path: '/live/video',
      name: 'livevideo',
      component: VideoJS
    },
    {
      path: '/portal',
      name: 'portal',
      component: Portal
    },
    {
      path: '/portal/odvideo',
      name: 'odvideo',
      component: ODVideo
    }
  ]
})
