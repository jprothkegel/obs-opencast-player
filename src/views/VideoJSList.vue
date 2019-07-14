<template>
    <v-layout justify-center align-center="" class="mt-4">
        <v-flex xs12 sm8 md6>
            <v-card>
                <v-list two-line="">
                    <v-subheader>
                        Transmisión en vivo
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="update">Actualizar</v-btn>
                    </v-subheader>
                    <v-list-tile @click="goToVideo(item._id)" v-for="item in items" :key="item.id">
                        <v-list-tile-avatar>
                            <img :src="utfsm">
                        </v-list-tile-avatar>
                        <v-list-tile-content>
                            <v-list-tile-title>{{item.metadata.fields[0].value}}</v-list-tile-title>
                            <v-list-tile-sub-title>{{item.date}}</v-list-tile-sub-title>
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
            utfsm: require('../assets/usmlogo.png'),
            items: []
        }
    },
    created(){
        this.update()
    },
    methods: {
        goToVideo(streamKeyId){
            this.$router.push({name: 'livevideo', params:{id: streamKeyId}})
        },
        update(){
            this.$store.dispatch('getVideos')
            .then(resp => {
                this.items = this.$store.state.videos
                console.log(this.$store.state.videos)
            })
            .catch(err => {
                console.log(err)
            })
        }
    }
}
</script>
