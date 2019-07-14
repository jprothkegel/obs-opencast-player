<template>
    <v-card flat class="transparent">
        <v-img :src=image aspect-ratio="2.75">
        </v-img>
        <v-card-title>
            <div>
                <h3 class="title mb-0"> {{this.title}} </h3>
                <div class="subheading"> {{this.description}} </div> 
            </div>
        </v-card-title>
    </v-card>
</template>

<script>
export default {
    data(){
        return{}
    },
    props: {
        image: {
            type: String
        },
        title: {
            type: String
        },
        description: {
            type: String
        }
    }
}
</script>
