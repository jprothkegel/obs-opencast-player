import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const backUrl = 'http://200.1.17.128:3000/'

export default new Vuex.Store({
  state: {
    loading: false,
    status: '',
    ondemand: [],
    videos: []
  },
  mutations: {
    setLoading(state, payload){
      state.loading = payload
    },
    ondemand_request(state){
      state.status = 'Fetching on demand videos'
    },
    ondemand_success(state, ondemand){
      state.status = 'success'
      state.ondemand = ondemand
    },
    ondemand_link_requests(state){
      state.status = 'Fetching on demand video link'
    },
    ondemand_link_success(state){
      state.status = 'Link fetched succesfully'
    },
    videos_request(state){
      state.status = 'Fetching live videos'
    },
    videos_success(state, videos){
      state.status = "success",
      state.videos = videos
    }
  },
  actions: {
    getOndemandVideos({commit}){
      return new Promise((resolve, reject) => {
        commit('setLoading', true)
        commit('ondemand_request')
        axios({
          url: backUrl + 'ondemand/',
          method: 'GET'
        })
        .then(resp => {
          commit('ondemand_success', resp.data.videos)
          commit('setLoading', false)
          resolve(resp.data.videos)
        })
        .catch(err => {
          commit('setLoading', false)
          reject(err)
        })
      })
    },
    getOndemandLinks({commit}, id){
      return new Promise((resolve, reject) => {
        commit('setLoading', true)
        commit('ondemand_link_requests')
        axios({
          url: backUrl + 'ondemand/link',
          method: 'POST',
          data: {
            eventId: id
          }
        })
        .then(resp => {
          commit('ondemand_link_success')
          commit('setLoading', false)
          resolve({
            id: resp.data.message.id,
            videoUrl: resp.data.message.videoUrl,
            previewUrl: resp.data.message.previewUrl,
            videoUrlArray: resp.data.message.videoUrlArray,
            duration: resp.data.message.duration
          })
        })
        .catch(err => {
          commit('setLoading', false)
          reject(err)
          
        })
      })
    },
    getVideos({commit}){
      return new Promise((resolve, reject) => {
        commit('videos_request')
        axios.get(backUrl + 'video/all')
        .then(resp => {
          commit('videos_success', resp.data.videos)
          resolve(resp.data.videos)
        })
        .catch(err => {
          reject(err)
        })
      })
    },
    getVideo({commit}, streamKeyId){
      commit('setLoading', true)
      return new Promise((resolve, reject) => {
        axios.get(backUrl + 'video/' + streamKeyId)
        .then(resp => {
          commit('setLoading', false)
          resolve(resp)
        })
        .catch(err => {
          commit('setLoading', false)
          reject(err)
        })
      })
    }
  },
  getters: {
    loading: state => state.loading
  }
})
