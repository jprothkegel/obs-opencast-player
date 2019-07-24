<template>
    <v-layout row wrap justify-center align-center="">
        <v-progress-circular v-if="this.$store.getters.loading" class="mt-4" content-class="progress" indeterminate :size="100" width="7" color="red"></v-progress-circular>
        <v-flex xs12 v-else>
            <v-container grid-list-xl>
                <div class="title">On Demand</div>
                <v-layout row wrap align-center justify-center="">
                    <v-flex xs6 md4 v-for="item in items.slice().reverse() " :key="item.id">
                        <on-demand-video-card
                        :image = "item.previewUrl"
                        :title = "item.title"
                        :description = "item.description"
                        :link = "item.videoUrl"
                        @click.native = "goToVideo(item.arrayUrl, item.title, item.creator[0], item.duration)"
                        >
                        </on-demand-video-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-flex>
    </v-layout>
</template>

<script>
import OnDemandVideoCard from '../components/OnDemandVideoCard'

export default {
    data(){
        return{
            items: []
        }
    },
    components: {
        OnDemandVideoCard
    },
    created(){
        this.$store.dispatch('getOndemandVideos')
        .then(resp => {
            this.items = this.$store.state.ondemand
            for (let i in this.items){
                this.getLinks(this.items[i].id, i)
                .then(resp => {
                    this.items[i]['videoUrl'] = resp.videoUrl
                    this.items[i]['previewUrl'] = resp.previewUrl
                    this.items[i]['arrayUrl'] = resp.videoUrlArray
                    this.items[i]['duration'] = resp.duration
                    this.$forceUpdate()
                })
                .catch(err => {
                    console.log("ERR ", err)
                })
            }
            console.log(this.items)
        })
        .catch(err => {
            console.log("ERR ", err)
        })
    }, 
    methods: {
        getLinks(id, i){
            return new Promise((resolve, reject) => {
                this.$store.dispatch('getOndemandLinks', id)
                .then(resp => {
                    resolve({
                        videoUrl: resp.videoUrl,
                        previewUrl: resp.previewUrl,
                        videoUrlArray: resp.videoUrlArray,
                        duration: resp.duration
                    })
                })
                .catch(err => {
                    reject(err)
                })
            })
        },
        goToVideo(link, title, contributor, duration){
            this.$router.push({name: 'ondemandvideo', params: {link: link, metadata: {title:title, contributor: contributor}, duration: duration}})
        }
    }
}
</script>
