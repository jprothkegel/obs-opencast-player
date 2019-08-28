<template>
    <iframe style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" :src="src"/>
</template>

<script>
export default {
    data(){
        return{
            src: '',
            videoId: ''
        }
    },
    created(){
        this.videoId = this.$route.params.id
        this.src = 'http://192.168.1.124:8080/engage/theodul/ui/core.html?id='+this.videoId
    }
}
</script>