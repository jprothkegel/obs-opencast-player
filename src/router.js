import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import OnDemand from './views/OnDemand.vue'
import OnDemandVideo from './components/OnDemandVideo.vue'
import LiveList from './views/VideoJSList.vue'
import VideoJS from './views/VideoJS.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      redirect: '/ondemand'
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/ondemand',
      name: 'ondemand',
      component: OnDemand
    },
    {
      path: '/ondemand/video',
      name: 'ondemandvideo',
      component: OnDemandVideo
    },
    {
      path: '/live',
      name: 'live',
      component: LiveList
    },
    {
      path: '/live/video',
      name: 'livevideo',
      component: VideoJS
    }
  ]
})
