<template>
    <v-content>
        <v-layout align-center="" justify-center="">
            <v-card width="1300">
                <div class="player">
                    <video-player v-if="this.$store.getters.loading === false" class="vjs-custom-skin" :options="playerOptions">
                    </video-player>
                    <div class="text-xs-center" v-else>
                        <v-progress-circular indeterminate="" color="red"></v-progress-circular>
                    </div>
                </div>
                <v-card-title>
                    <div>
                        <h3 class="headline mb-0"> {{this.videoMetadata[0].value}} </h3>
                        <div> {{this.videoMetadata[1].value}} </div>
                    </div>
                </v-card-title>
            </v-card>
        </v-layout>
    </v-content>
</template>

<script>
import utfsm from '../assets/logo-usm-electronica.jpg'
import videojs from 'video.js'
window.videojs = videojs
require('videojs-contrib-hls/dist/videojs-contrib-hls.js')

export default {
    data(){
        return{
            streamKey: '',
            keyPath: '',
            playerOptions: {
                height: '450',
                fluid: true,
                sources: [{
                    withCredentials: false,
                    type: "application/x-mpegURL",
                    src: ""
                }],
                controlBar: {
                    timeDivider: false,
                    durationDisplay: false
                },
                flash: {
                    hls: {
                        withCredentials: false
                    }
                },
                html5: {
                    hls: {
                        withCredentials: false
                    }
                },
                poster: utfsm
            },
            videoMetadata: {}
        }
    },
    beforeCreate(){
        this.streamKey = this.$route.params.id
        this.$store.dispatch('getVideo', this.streamKey)
        .then(resp => {
            this.keyPath = resp.data.streamKey.key
            this.videoMetadata = resp.data.video.metadata.fields
            this.playerOptions.sources[0].src = "http://192.168.1.171/live/" + this.keyPath + "/index.m3u8"
            console.log("keypathc ", this.keyPath)
            console.log("metadata ",this.videoMetadata)
            console.log(this.playerOptions.sources[0].src)
        })
        .catch(err => {
            console.log(err)
        })
    },
    computed: {
        test(){
            return this.keyPath
        }
    }
}
</script>
