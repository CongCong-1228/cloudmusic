<template>

  <div class="player" v-show="currentTrack">

    <VueSlider
        v-model="percent"
        :tooltip-formatter="getTime(currentTime)"
        :tooltip="'active'"
        :max="100"
        :min="0"
        :lazy="true"
        :interval="1"
        :dotSize="12"
        :slient="true"
        style="width: 100%; padding: 0 15px">

    </VueSlider>
    <!--      <div class="progress" :style="{ width:percent*100+'%'}">-->
    <!--        <div class="progress-circle">-->
    <!--          <div class="percent"></div>-->
    <!--        </div>-->
    <!--      </div>-->

    <div class="player-container">
      <div class="player-left">
        <div class="bg">
          <img :src="currentTrack.bg " class="bg-img" alt="">
        </div>
        <div class="tit-ava">
          <div class="tit">{{ currentTrack.title }}</div>
          <div class="ava">{{ currentTrack.avatar }}</div>
        </div>
        <div class="like">
          <svg-icon icon-class="like" style="height: 25px; width: 25px;"></svg-icon>
        </div>

      </div>
      <div class="player-mid">
        <div class="button-icon" @click="lastMusic">
          <svg-icon icon-class="previous" style="height: 20px; width: 20px;"></svg-icon>
        </div>
        <div class="button-icon" @click="setPlay">
          <svg-icon :icon-class="getPause ? 'play':'pause'" style="height: 30px; width: 30px;"></svg-icon>

        </div>
        <div class="button-icon" @click="nextMusic">
          <svg-icon icon-class="next" style="height: 20px; width: 20px;"></svg-icon>
        </div>
      </div>


      <div class="player-right">
        <div class="buttons">

          <div class="button-icon" @click="ToList" :class="getList ? 'active': ''">
            <svg-icon icon-class="list" style="height: 20px; width: 20px;"></svg-icon>
          </div>

          <div class="button-icon"
               @click="cycleMusic"
               :class="getCycle ? 'active': ''"
          >
            <svg-icon icon-class="repeat"
                      style="height: 20px; width: 20px;"

            ></svg-icon>
          </div>
          <div class="button-icon" @click="loopMusic"
               :class="getLoop ? 'active': ''">
            <svg-icon icon-class="shuffle"
                      style="height: 20px; width: 20px;"

            ></svg-icon>

          </div>
          <div class="button-icon">
            <svg-icon icon-class="volume" style="height: 20px; width: 20px;"></svg-icon>
          </div>
          <div class="wrapper">
            <div class="block" style="width: 84px">
              <el-slider id="el-slider" v-model="volume"></el-slider>
            </div>
          </div>
          <div class="button-icon" @click="showLyrics" :class="getLyrics ? 'show': ''">
            <svg-icon icon-class="arrow-up" style="height: 20px; width: 20px;"></svg-icon>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import Category from '@/apis/category'

// import Song from '@/apis/song'

import {mapMutations, mapActions, mapGetters} from "vuex";
import VueSlider from "vue-slider-component";

export default {

  components: {VueSlider},
  name: 'Player',
  // mounted() {
  //   this.getMusicList({id: this.$route.params.id})
  // },
  created() {
    this.setCurrentTrack()
  },
  computed: {

    ...mapGetters([
      'getPause',
      'currentTime',
      'audio',
      'getLoop',
      'getCycle',
      'currentTrack',
      'getList',
      'getLyrics']),
    volume: {
      get() {
        return this.$store.getters.volume
      },
      set(volume) {
        this.$store.commit('setVolume', {volume})

      }
    },
    percent: {
      get() {
        return this.$store.getters.percent
      },
      set(percent) {
        console.log(percent)
        this.$store.commit('setPercent', {percent})
      }
    }
  },
  methods: {
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
    ToList() {
      this.showList()
      if (this.getList) {
        this.$router.push({path: '/next'})
      } else {
        this.$router.back()
      }
    },
    ...mapMutations([
      'showLyrics',
      'showList',
      'setVolume',
      'setCurrentTrack',
      'setPause',
      'setPlay',
      'getAudio',
      'nextMusic',
      'lastMusic',
      'loopMusic',
      'cycleMusic'
    ]),
    ...mapActions([
      'getMusicList'
    ]),


  }

}
</script>

<style>
.block .el-slider__bar {
  height: 6px;
  background-color: #000 !important;
}

.block .el-slider__button {
  width: 10px;
  height: 10px;
  border: 2px solid #000;
  background-color: #FFF;
  border-radius: 50%;
  transition: .2s;
}
</style>

<style scoped>
.Lyrics {
  height: 100vh;
  width: 100vw;
  background: teal;
}

.player {
  background: rgb(255, 255, 255);
  height: 64px;
  width: 100%;
}

.player-top {
  height: 10px;
}

.player-container {
  display: flex;
  align-items: center;
  padding: 0 5vw;
  height: 100%;
}

.player-left {
  display: flex;
  align-items: center;
  flex: 4;
  margin-bottom: 5px;
}

.player-left .bg-img {
  height: 46px;
  width: 46px;
  border-radius: 6px;
  cursor: pointer;

}

.player-left .tit-ava {
  margin-left: 10px;
  cursor: pointer;
  color: #000;
}

.player-left .tit {
  font-weight: 600;
  font-size: 16px;
  opacity: .88;
}

.player-left .tit:hover {
  text-decoration: underline;
}

.player-left .ava {
  font-size: 12px;
  opacity: .58;
}

.player-left .like {
  margin-left: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 25%;
  background: transparent;
  transition: all .2s;
  cursor: pointer;
}

.player-left .like:hover {
  background: #f5f5f7;
}

.player-mid {
  display: flex;
  padding: 0 8px;
  flex: 2;
  justify-content: center;
  margin-bottom: 5px;
}

.button-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  background: transparent;
  margin: 4px;
  border-radius: 25%;
  transition: all .2s;
  cursor: pointer;
}

.button-icon:hover {
  background: #f5f5f7;
}

.player-right {
  display: flex;
  flex: 4;
  margin-left: 20px;
  justify-content: center;
  margin-bottom: 5px;
}

.buttons {
  display: flex;
  align-items: center;
}

.button-icon.active {
  color: blue;
}

.wrapper {
  position: relative;
  display: flex;
  align-items: center;
  width: 100px;
  height: 0;
}

.player-top {
  height: 2px;
  background: gray;
  width: 100%;
  position: relative;
}

.player-top .progress {
  position: relative;
  height: 2px;
  background: blue;
  top: 0;
  display: flex;
  align-items: center;
}

.player-top .progress-circle {
  position: absolute;
  height: 10px;
  width: 10px;
  border-radius: 50%;
  background: #fff;
  right: 0;
  display: none;
}

.progress:hover .progress-circle {
  display: block;
}

.percent {
  position: absolute;
  right: -15px;
  top: -40px;
  height: 20px;
  width: 30px;
  border: 1px solid red;
  display: none;
  border-radius: 6px;
  background: #fff;
  text-align: center;
  line-height: 20px;
}

.progress-circle:hover .percent {
  display: block;
}


</style>
