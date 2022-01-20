import Vue from 'vue'
import Vuex from 'vuex'
import songs from '@/store/modules/songs'
import playing from "@/store/modules/playing";
Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        songs,
        playing
    }
})
