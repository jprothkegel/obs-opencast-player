<template>
    <v-container>
        <v-layout align-center justify-center>
            <v-card width="1920" flat color="#fafafa">

                <div class="player" v-if="this.$route.params.link.length === 1">
                    <video-player
                    ref="videoPlayer"
                    data-setup ='{ "aspectRatio": "16:9"}'
                    class="vjs-custom-skin"
                    :options = 'playerOptions'
                    >
                    </video-player>
                </div>
                
                <div class="player" v-else>
                    <v-layout row wrap>
                        <v-flex xs6 v-if="this.$store.getters.loading === false">
                            <video-player
                            ref="videoPlayer"
                            data-setup ='{ "aspectRatio": "16:9"}'
                            class="vjs-custom-skin"
                            :options = 'playerOptions'
                            >
                            </video-player>
                        </v-flex>

                        <v-flex xs6 v-if="this.$store.getters.loading === false">
                            <video-player
                            ref="videoPlayer2"
                            data-setup ='{ "aspectRatio": "16:9"}'
                            class="vjs-custom-skin"
                            :options = 'playerOptions2'
                            >
                            </video-player>
                        </v-flex>
                        <div class="text-xs-center" v-else>
                            <v-progress-circular content-class="progress" indeterminate :size="20" width="3" color="indigo"></v-progress-circular>
                        </div>
                    </v-layout>
                </div>

                <v-layout align-center="" justify-center="">
                    <v-flex xs12>
                        <v-slider v-if="this.$route.params.link.length === 1"
                        v-model="vidPos"
                        @change="setCurrentTime([player])"
                        color="#ff0000"
                        :max = "duration"
                        step = "0.000001"
                        >
                        </v-slider>

                        <v-slider v-else
                        v-model="vidPos"
                        @change="setCurrentTime([player, player2])"
                        color="#ff0000"
                        :max = "duration"
                        step = "0.000001"
                        >
                        </v-slider>
                    </v-flex>
                </v-layout>

                <v-layout row wrap>
                    <v-btn icon @click="playPlayer([player])" v-if="this.$route.params.link.length === 1">
                        <v-icon>play_arrow</v-icon>
                    </v-btn>
                    <v-btn icon @click="playPlayer([player,player2])" v-else>
                        <v-icon>play_arrow</v-icon>
                    </v-btn>

                    <v-btn icon @click="pausePlayer([player])" v-if="this.$route.params.link.length === 1">
                        <v-icon>pause</v-icon>
                    </v-btn>
                    <v-btn icon @click="pausePlayer([player,player2])" v-else>
                        <v-icon>pause</v-icon>
                    </v-btn>

                    <v-btn icon @click="resetVideo([player]) " v-if="this.$route.params.link.length === 1">
                        <v-icon>refresh</v-icon>
                    </v-btn>
                    <v-btn icon @click="resetVideo([player,player2]) " v-else>
                        <v-icon>refresh</v-icon>
                    </v-btn>

                    <v-btn flat> {{this.currTime2}}/{{this.getTime}} </v-btn>
                    <v-spacer></v-spacer>

                    <div class="text-xs-center">
                        <v-menu offset-y="">
                            <v-btn flat slot="activator" icon>
                                <v-icon>volume_up</v-icon>
                            </v-btn>
                            <v-slider dark v-if="this.$route.params.length === 1"
                            color="black"
                            v-model="volume"
                            append-icon="volume_up"
                            prepend-icon="volumne_down"
                            @change="changeVolume([player]) ">
                            </v-slider>

                            <v-slider dark v-else
                            color="black"
                            v-model="volume"
                            append-icon="volume_up"
                            prepend-icon="volumne_down"
                            @change="changeVolume([player, player2]) ">
                            </v-slider>
                        </v-menu>
                    </div>
                </v-layout>
                <v-card-title primary-title>
                    <div>
                        <h3 class="title mb-0"> {{this.$route.params.metadata.title}} </h3>
                        <div class="subheading"> {{this.$route.params.metadata.contributor}} </div>
                    </div>
                </v-card-title>
            </v-card>
        </v-layout>
    </v-container>
</template>

<script>
import utfsm from '../assets/utfsm2.jpg'
import videojs from 'video.js'
import { clearInterval, setInterval} from 'timers'
window.videojs = videojs

export default {
    data(){
        return {
            state: "paused",
            duration: 0.0,
            currTime: 0.0,
            currTime2: '00:00',
            volume: '100',
            vidPos: 0.0,
            currVidPos: 0.0,
            playerOptions: {
                height: "450",
                fluid: true,
                sources: [{
                    withCredentials: false,
                    src: "",
                    type: 'video/mp4'
                }],
                poster: utfsm,
                controls: false
            },
            playerOptions2: {
                height: "450",
                fluid: true,
                sources: [{
                    withCredentials: false,
                    src: "",
                    type: 'video/mp4'
                }],
                poster: utfsm,
                controls: false,
                muted: true
            }
        }
    },
    created(){
        if(this.$route.params.link.length === 1){ 
            this.playerOptions.sources[0].src = this.$route.params.link[0].url
        } else {
            this.playerOptions.sources[0].src = this.$route.params.link[0].url
            this.playerOptions2.sources[0].src = this.$route.params.link[1].url
        }
        this.duration = Math.round(this.$route.params.duration / 1000.0)
    },
    computed:{
        player(){
            return this.$refs.videoPlayer.player
        },
        player2(){
            return this.$refs.videoPlayer2.player
            
        },
        getTime(){
            if(this.duration >= 3600){
                var hours = Math.round(this.duration/3600)
                var minutes = Math.round(((this.duration/3600)%1)*60)
                var seconds = Math.round(((((this.duration/3600)%1)*60)%1)*60)
                return hours + ':' + minutes + ':' + seconds
            } 
            else if(this.duration >= 60 && this.duration < 3600){
                var minutes = Math.round(this.duration/60)
                var seconds = Math.round(((this.duration/60)%1)*60)
                minutes = minutes >= 10 ? minutes : '0' + minutes
                seconds = seconds >= 10 ? seconds : '0' + seconds
                return minutes + ':' + seconds
            }
            else {
                var sec = this.duration
                sec = sec >= 10 ? sec : '0' + sec
                return '00:' + sec
            }
        }
    },
    methods: {
        playPlayer(players){
            for (let i in players){
                players[i].play()
            }
            this.getCurrentTime(this.player)
            
        },
        pausePlayer(players){
            for (let i in players){
                players[i].pause()
            }
            this.stopInterval()
        },
        changeVolume(players){
            for (let i in players){
                players[i].volume(this.volume/100)
            }
        },
        setCurrentTime(players){
            for(let i in players){
                players[i].currentTime(this.vidPos)
            }
        },
        getCurrentTime(player){
            this.state = "start"
            var myInterval = setInterval(() => {
                if(this.currTime >= Math.floor(this.duration)){
                    this.state = "paused"
                }
                if(this.state != "paused"){
                    this.currTime = player.currentTime()
                    this.vidPos = this.currTime 

                    if(Math.ceil(player.currentTime()) >= 3600){
                        var hours = Math.round(((player.currentTime())/3600))
                        var minutes = Math.round((((player.currentTime())/3600)%1)*60)
                        var seconds = Math.round((((((player.currentTime())/3600)%1)*60)%1)*60)
                        this.currTime2 = hours + ':' + minutes + ':' + seconds
                    }else if (Math.ceil(player.currentTime()) >= 60 && Math.ceil(player.currentTime())<3600){
                        var minutes = Math.round(((player.currentTime())/60))
                        var seconds = Math.round((((player.currentTime())/60)%1)*60)
                        minutes = minutes >= 10 ? minutes : '0' + minutes
                        seconds = seconds >= 10 ? seconds : '0' + seconds
                        this.currTime2 = minutes + ':' + seconds
                    } else {
                        var sec = Math.round(player.currentTime())
                        sec = sec >= 10 ? sec : '0' + sec
                        this.currTime2 = '00:' + sec
                    }
                } else {
                    clearInterval(myInterval)
                }
            }, 100)
        },
        stopInterval(){
            this.state = "paused"
        },
        resetVideo(players){
            this.vidPos = 0.0
            this.setCurrentTime(players)
        }
    }
}
</script>
