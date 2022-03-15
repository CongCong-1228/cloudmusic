<template>
  <div id="playlist">
    <div class="cover-row">
      <div class="item" v-for="playlist in playlists" :key="playlist.name">
        <div class="shade">
          <router-link :to="`playlist/${playlist.id.toString()}`">
            <img :src="playlist.coverImgUrl" alt=""></router-link>
          <div class="playButton" @click.stop.prevent="()=>playMusic(playlist)">
            <svg-icon icon-class="play" style="height: 20px; width: 20px"></svg-icon>
          </div>
        </div>

        <div class="text">
          <div class="playCount">
            <svg-icon icon-class="play_fill"></svg-icon>
            <span>{{ playCount(playlist.playCount) }}</span>
          </div>
          <router-link :to="`playlist/${playlist.id.toString()}`" class="description">{{ playlist.name }}</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapMutations, mapGetters, mapActions} from "vuex";
// import Throttle from "../utils/throttle";

export default {
  data() {
    return {
      cd: false,
      timer: null,
    }
  },
  created() {
  },
  computed: {
    ...mapGetters(['CurrentTrack', 'currentTrack', 'getPause', 'musicList','audio'])
  },
  props: ['playlists'],
  watch: {
    musicList() {
      this.setIndex({index: 0})
      this.setAudioTime()
      this.getCurrentTrack()
      // this.Play()
      // this.setPlay()
      this.Play()
      console.log(this.currentTrack.url);
      this.audio.src = this.currentTrack.url
      console.log(this.audio.src)
      this.audio.play()
    }
  },
  methods: {
    playMusic(playlist) {
      this.getMusicList({id: playlist.id})

    },
    ...mapMutations(['setPlay', 'getCurrentTrack', 'setPause', 'setIndex', 'Play','setAudioTime']),
    ...mapActions(['getMusicList']),
    playCount(number) {
      if (number / 10000 < 1) {
        return Math.floor(number)
      } else if (number / 10000 < 10000) {
        return Math.fround(number / 10000).toFixed(1) + '万'
      } else if (number / 10000 > 10000) {
        return Math.fround(number / 100000000).toFixed(1) + '亿'
      }
    }
  }
}
</script>

<style scoped>
#playlist {
  margin-top: 20px;
}

.cover-row {

  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 44px 24px;
}

.item {
  display: flex;
  flex-direction: column;

}

.shade {
  display: flex;
  justify-content: center;
  align-items: center;
}

.playButton {
  position: absolute;
  display: none;
  border-radius: 50%;
  height: 50px;
  width: 50px;
  background: hsla(0, 0%, 100%, .14);
  color: aliceblue;
  transition: .2s linear;
}

.shade img {
  width: 100%;
  border-radius: 12px;
  cursor: pointer;
  transition: .2s linear;
}

.shade:hover img {
  box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
}


.shade:hover .playButton {
  display: flex;
  justify-content: center;
  align-items: center;
}

.text {
  display: flex;
  flex-direction: column;
  margin-top: 8px;
}

.playCount {
  font-weight: 600;
  color: rgb(155, 155, 155);
  font-size: 12px;

}

.description {
  overflow: hidden;
  text-decoration: none;
  cursor: pointer;
  font-weight: 600;
  color: black;
  line-height: 1.2;
  max-height: 2.4em;
  position: relative;
}

.description:hover {
  text-decoration: underline;
}
</style>
