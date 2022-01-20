<template>
  <div id="next">
    <h1 class="title">正在播放</h1>
    <div class="track-list">
      <div class="track-playlist">
        <!--           :class="CurrentTrack[index]===CurrentTrack?'active':''">-->
        <div class="img-wrapper">
          <img :src="MusicList[index].al.picUrl" class="img" alt="">
        </div>
        <div class="container">
          <div class="tit">{{ MusicList[index].name }}</div>
          <router-link to="#" class="art">{{ MusicList[index].ar[0].name }}</router-link>
        </div>
        <div class="main">
          <router-link to="#" class="main-description">{{ MusicList[index].al.name }}</router-link>
        </div>
        <div class="actions">
          <svg-icon icon-class="like" class="icon-like"></svg-icon>
        </div>
        <div class="time">{{ playTime(MusicList[index].dt) }}</div>
      </div>
    </div>
    <h2 class="title">即将播放</h2>
    <div class="track-list">
      <div class="track-playlist" v-for="track in MusicList" :key="track.id"
           :class="MusicList[index]===track?'active':''">
        <div class="img-wrapper">
          <img :src="track.al.picUrl" class="img" alt="">
        </div>
        <div class="container">
          <div class="tit">{{ track.name }}</div>
          <router-link to="#" class="art">{{ track.ar[0].name }}</router-link>
        </div>
        <div class="main">
          <router-link to="#" class="main-description">{{ track.al.name }}</router-link>
        </div>
        <div class="actions">
          <svg-icon icon-class="like" class="icon-like"></svg-icon>
        </div>
        <div class="time">{{ playTime(track.dt) }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";

export default {
  computed: {
    ...mapGetters(['MusicList', 'index', 'CurrentTrack'])
  },
  methods: {
    ...mapMutations([]),
    playTime(timestamp) {
      const date = new Date(timestamp)
      const M = date.getMinutes()
      const S = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
      return M + ':' + S
    },
  }
}
</script>


<style scoped>
.track-playlist .img {
  border-radius: 8px;
  height: 46px;
  width: 46px;
  margin-right: 20px;
  border: 1px solid rgba(0, 0, 0, .04);
  cursor: pointer;
}

.track-playlist {
  display: flex;
  padding: 10px;
  align-items: center;
  border-radius: 12px;
  transition: .2s linear;
}

.track-playlist.active {
  color: #335eea;
  background: #eaeffd;
}

.track-playlist:hover {
  background: #f5f5f7;

}

.track-playlist:hover .actions {
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 1;
}

.container {
  flex: 1;
}

.container .tit {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 3px;
}

.container .art {
  font-size: 13px;

  text-decoration: none;
  cursor: pointer;
}

.art:hover {
  text-decoration: underline;
}

.main {
  flex: 1;
}

.main-description {
  cursor: pointer;
  text-decoration: none;

}

.main-description:hover {
  text-decoration: underline;
}

.actions {
  opacity: 0;
}

.icon-like {
  height: 30px;
  width: 30px;
  color: #335eea;
  transition: .1s linear;
}

.icon-like:hover {

}

.time {
  font-size: 16px;
  opacity: .88;
  margin-right: 10px;
  margin-left: 20px;
}
</style>
