<template>
    <v-layout justify-center align-center class="mt-4">
        <v-flex xs12 sm8 md6>
            <v-card>
                <v-list two-line>
                    <v-subheader>
                        Live
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="update">Actualizar</v-btn>
                    </v-subheader>
                    <v-list-tile @click="goToVideo(live._id)" v-for="live in liveVideos" :key="live.title">
                        <v-list-tile-avatar>
                            <img :src="elo"/>
                        </v-list-tile-avatar>
                        <v-list-tile-content>
                            <v-list-tile-title>{{live.metadata.fields[0].value}} </v-list-tile-title>
                            <v-list-tile-sub-title>{{live.date}} </v-list-tile-sub-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-divider></v-divider>
                    <v-subheader>
                        On Demand
                    </v-subheader>
                    <v-progress-circular v-if="this.$store.getters.loading" class="mt-4" content-class="progress" indeterminate :size="50" width="4" color="red"></v-progress-circular>
                    <v-list-tile v-else v-for="od in ondemandVideos.slice().reverse()" :key="od.title" @click="goToOndemandVideo(od.id)">
                        <v-list-tile-avatar>
                            <img :src="elo"/>
                        </v-list-tile-avatar>
                        <v-list-tile-content>
                            <v-list-tile-title>{{od.title}}</v-list-tile-title>
                            <v-list-tile-sub-title>{{od.creator[0]}} </v-list-tile-sub-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
export default {
    data(){
        return {
            elo: require('../assets/logoelo.png'),
            liveVideos:[],
            ondemandVideos:[]
        }
    },
    created(){
        this.update()
        this.$store.dispatch('getOndemandVideos')
        .then(resp => {
            this.ondemandVideos = resp
        })
    },
    methods: {
        goToVideo(streamKeyId){
            this.$router.push({name: 'livevideo', params:{id:streamKeyId}})
        },
        update(){
            this.$store.dispatch('getVideos')
            .then(resp => {
                this.liveVideos = this.$store.state.videos
                console.log(this.$store.state.videos)
            })
            .catch(err => {
                console.log(err)
            })
            this.$store.dispatch('getOndemandVideos')
            .then(resp => {
                this.ondemandVideos = resp
            })
            .catch(err => {
                console.log(err)
            })
        },
        goToOndemandVideo(videoId){
            this.$router.push({name: 'odvideo', params:{id:videoId}})
        }
    },
    
}
</script>