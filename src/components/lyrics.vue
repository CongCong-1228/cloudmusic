<template>
  <div id="lyrics" :class="getLyrics ? 'show' : '' ">
    <div class="arrow-done button-icon" @click="showLyrics">
      <svg-icon icon-class="arrow-down" style="height: 30px; width: 30px"></svg-icon>
    </div>
    <div class="left-side">
      <div>
        <img class="bg" :src="currentTrack.bg" alt=""></div>
      <div class="controls">
        <div class="top-part">
          <div class="tit-ava">
            <div class="tit">{{ currentTrack.title }}</div>
            <div class="ava">{{ currentTrack.avatar }}</div>
          </div>
        </div>
        <div class="progress-bar">

          <span>{{ getTime(currentTime) }}</span>
          <VueSlider v-model="percent"
                     :tooltip-formatter="getTime(currentTime)"
                     :tooltip="'active'"
                     :lazy="true"
                     :interval="1"
                     :dotSize="12"
                     :slient="true"
                     style="width: 100%; padding: 0 15px">

          </VueSlider>

          <span>{{ playTime(currentTrack.dt) }}</span>
        </div>
        <div class="media-controls">
          <div class="buttons">
            <div class="button-icon" @click="loopMusic"
                 :class="getLoop ? 'active': ''">
              <svg-icon icon-class="repeat" class="loop" style=" height: 14px; width: 14px;"></svg-icon>
            </div>
            <div class="button-icon" @click="lastMusic">
              <svg-icon icon-class="previous" style="height: 20px; width: 20px; color: #fff;"></svg-icon>
            </div>
            <div class="button-icon" @click="setPlay">
              <svg-icon :icon-class="getPause ? 'play': 'pause'"
                        style="height: 25px; width: 25px; color: #fff;"></svg-icon>
            </div>
            <div class="button-icon" @click="nextMusic">
              <svg-icon icon-class="next" style="height: 20px; width: 20px; color: #fff;"></svg-icon>
            </div>
            <div class="button-icon" @click="cycleMusic"
                 :class="getCycle ? 'active': ''">
              <svg-icon icon-class="shuffle" class="cycle" style=" height: 14px; width: 14px;"></svg-icon>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="right-side">
      <div class="lyrics-container">
        <div class="line"
             :ref="'lyric-' + lyric.time"
             :class="currLrcTime === lyric.time ? 'active': ''"
             v-for="lyric in lyricList" :key="lyric.time">
          <span>{{ lyric.content }}</span>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import Song from '@/apis/song'
import {mapGetters, mapMutations} from "vuex";
import {lyricParser} from '@/utils/lyrics'
// import Debounce from "@/utils/debounce1";
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'

export default {
  name: 'Lyric',
  components: {VueSlider},
  data() {
    return {
      currLrcTime: 0,
      lyricList: [],
    }
  },
  computed: {
    ...mapGetters([
      'currentTrack',
      'currentTime',
      'getCycle',
      'getLoop',
      'getPause',
      'getLyrics',
      'duration',
      'percent'
    ]),
    percent: {
      // eslint-disable-next-line vue/return-in-computed-property
      get() {

        return this.$store.getters.percent


        // return this.$store.getters.percent * 100
      },
      set(percent) {

        this.$store.commit('setPercent', {percent})
      }

    }
  },

  watch: {
    currentTrack() {
      this.lyricList = []
      Song.song_lyric({id: this.currentTrack.id})
          .then(res => {
            this.lyricList = lyricParser(res.data).lyric
          })
    },
    currentTime(newVal) {
      // 如果歌词列表不为空再去查询
      if (this.lyricList) {
        let curr = this.lyricList.map(item => item.time).filter(item => item < newVal).slice(-1)[0]
        if (curr !== this.currLrcTime) {
          this.currLrcTime = curr;
          this.$refs['lyric-' + this.currLrcTime][0].scrollIntoView({behavior: "smooth", block: "center"})
        }
      }
    },

  },
  methods: {
    ...mapMutations([
      'setCurrentTime',
      'getCurrentTrack',
      'setCurrentTrack',
      'setPlay',
      'nextMusic',
      'lastMusic',
      'loopMusic',
      'cycleMusic',
      'showLyrics'
    ]),
    getTime(currentTime) {
      const time = Math.floor(currentTime)
      if (time < 60) {
        if (time < 10) {
          return '0:0' + time
        } else {
          return '0:' + time
        }
      } else {
        if (Math.floor(time % 60 < 10)) {
          return Math.floor(time / 60) + ':0' + Math.floor(time % 60)
        }
        return Math.floor(time / 60) + ':' + Math.floor(time % 60)
      }
    },
    playTime(timestamp) {
      const date = new Date(timestamp)
      const M = date.getMinutes()
      const S = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
      return M + ':' + S
    },

  },


}
</script>


<style scoped>
.line {
  padding: 10px 0 10px 20px;
  opacity: 0.6;
  font-size: 18px;
  transition: all .3s;
  line-height: 40px;
  border-radius: 5px;
}

.line.active {
  opacity: 0.9;
  font-size: 24px;
  background: rgba(0, 0, 0, 0.1);
}


#lyrics {
  display: flex;
  color: #fff;
}

::-webkit-scrollbar {
  width: 0; /* Remove scrollbar space */
  background: transparent; /* Optional: just make scrollbar invisible */
}

.arrow-done {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 50px;
  z-index: 2;
  top: 30px;
}

.left-side {
  flex: 1;
  display: flex;
  justify-content: center;
  margin-right: 32px;
  margin-top: 24px;
  align-items: center;
  transition: all .5s;
  z-index: 1;
  flex-direction: column;
  margin-left: 50px;
}

.right-side {
  flex: 1;
  font-weight: 600;
  margin-right: 24px;
}

.bg {
  border-radius: 0.75em;
  width: 54vh;
  height: 54vh;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -o-object-fit: cover;
  object-fit: cover;
}

.controls {
  max-width: 54vh;
  margin-top: 24px;
  width: 100%;
  height: 200px;
}

.controls .top-part {
  display: flex;
  align-items: center;
  height: 50px;
}

.top-part .tit-ava {
}

.tit {
  margin-top: 8px;
  font-size: 1.4rem;
  font-weight: 600;
  opacity: .88;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}

.ava {
  margin-top: 4px;
  font-size: 1rem;
  opacity: .58;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}

.progress-bar {
  display: flex;
  margin-top: 22px;
  align-items: center;
}

.slider {
  height: 4px;
  background: gray;
  margin: 0 10px;
  width: 100%;
}

.sroll {
  position: relative;
  background: #335eea;
  display: flex;
  align-items: center;
  height: 4px;
}

.sroll .circle {
  height: 10px;
  width: 10px;
  position: absolute;
  right: 0;
  background: #fff;
  border-radius: 50%;
}

.media-controls {
  margin-top: 30px;
}

.buttons {
  display: flex;
  align-items: center;
  justify-content: center;
}

.button-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 15px;
  padding: 8px;
  background: transparent;
  border-radius: 25%;
  transition: all .2s;
  cursor: pointer;
}

.button-icon:hover {
  background: hsla(0, 0%, 100%, 0.08);
}

.loop {
  opacity: .38;
}

.cycle {
  opacity: .38;
}

.button-icon.active .cycle {
  opacity: 1;

}

.button-icon.active .loop {
  opacity: 1;

}

.lyrics-container {
  height: 100%;
  /*display: flex;*/
  flex-direction: column;
  padding-left: 78px;
  max-width: 460px;
  overflow-y: auto;
  transition: .5s;
  scrollbar-width: none;
}
</style>
