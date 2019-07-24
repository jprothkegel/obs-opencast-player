<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <v-avatar>
          <img :src="utfsm">
        </v-avatar>
        <span>ELO</span>
        <span class="font-weight-light">PLAYER</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-tooltip bottom>
        <template v-slot:activator=" { on } ">
          <v-btn icon flat v-on="on" @click="goLive">
            <v-icon>live_tv</v-icon>
          </v-btn>
        </template>
        <span>Transmisión en vivo</span>
      </v-tooltip>

      <v-tooltip bottom>
        <template v-slot:activator=" { on } ">
          <v-btn icon flat v-on="on" @click="goOD">
            <v-icon>videocam</v-icon>
          </v-btn>
        </template>
        <span>On Demand</span>
      </v-tooltip>
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
