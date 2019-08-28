<template>
  <v-app>
    <v-toolbar app>
      <router-link to="/portal" class="router-link">
        <v-toolbar-title class="headline text-uppercase">
          <v-avatar>
            <img :src="utfsm">
          </v-avatar>
          <span>ELO</span>
          <span class="font-weight-light">PLAYER</span>
        </v-toolbar-title>
      </router-link>
      <v-spacer></v-spacer>
    </v-toolbar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data () {
    return {
      utfsm: require('./assets/logoelo.png')
    }
  },
  methods: {
    goLive(){
      this.$router.push('/live')
    },
    goOD(){
      this.$router.push('/ondemand')
    }
  }
}
</script>

<style scoped>
.router-link {
  text-decoration: none;
}
</style>