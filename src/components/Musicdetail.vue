<template>

  <div>
    <audio/>
    <div class="info">
      <div class="cover">
        <img :src="playlist.coverImgUrl" alt="">
      </div>
      <div class="description">
        <div class="title">{{ playlist.name }}</div>
        <div class="artist">Playlist by
          <router-link to="#" class="wyy">云音乐官方歌单</router-link>
        </div>
        <div class="date-and-count">最后更新于{{ updateTime(playlist.updateTime) }} · {{ playlist.trackCount }} 首歌</div>
        <div class="tips" @click="open">{{ playlist.description }}</div>
        <div class="buttons">
          <div class="button play" @click="onPlay">
            <svg-icon icon-class="play" style="margin-right: 8px"></svg-icon>
            播放
          </div>
          <div class="button">
            <svg-icon icon-class="like" style="height: 25px; width: 25px;"></svg-icon>
          </div>
          <div class="button">
            <svg-icon icon-class="more" style="height: 25px; width: 25px;"></svg-icon>
          </div>
        </div>
      </div>
    </div>
    <div class="track-list">
      <div class="track-playlist" v-for="(track,i) in songList" :key="track.id"
           @dblclick="()=>playing(track,i)"
           :class="songList[songIndex]===track?'active':''">
        <div class="img-wrapper">
          <img :src="track.al.picUrl" class="img" alt="">
        </div>
        <div class="container">
          <div class="tit">{{ track.name }}</div>
          <span class="art">{{ track.ar[0].name }}</span>
        </div>
        <div class="main">
          <span class="main-description">{{ track.al.name }}</span>
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
import Category from '@/apis/category'

import {mapActions, mapGetters, mapMutations} from 'vuex'

export default {
  watch: {
    index() {
      this.songIndex = this.index
    }
  },
  data() {
    return {
      playlist: [],
      songList: [],
      songsId: [],
      songIndex: 0,
    }
  },
  created() {
    // this.getAudio({id: document.querySelector('audio')})
    this.getMusicList({id: this.$route.params.id})
    Category.detailList({id: this.$route.params.id})
        .then(res => {
          this.playlist = res.data.playlist
          res.data.playlist.trackIds.forEach(item => this.songsId.push(item.id))
          this.songsId = this.songsId.splice(0, 100).join(',')
          Category.allMusic({ids: this.songsId})
              .then(res => {
                this.songList = res.data.songs
              })
        })
  },
  computed: {
    ...mapGetters(['index', 'MusicList',])
  },
  methods: {
    ...mapMutations([
      'setPlay',
      'setIndex',
      'setCurrentTime',
      'getCurrentTrack',
      'getAudio',
      'playingCurrentTrack',
      'setPause',
      'setIndex',
    ]),
    ...mapActions(['getMusicList']),
    open() {
      this.$alert('韩系甜美小甜歌记得订阅哦', '歌单介绍', {
        showConfirmButton: false
      });
    },
    playing(track, i) {
      this.playingCurrentTrack(
          {
            index: i,
            name: track.name,
            title: track.al.name,
            avatar: track.ar[0].name,
            bg: track.al.picUrl,
            id: track.id,
            dt: track.dt
          })
      this.setIndex({index: i})
      this.setPause()
      this.setPlay()
    },
    updateTime(timestamp) {
      const date = new Date(timestamp)
      const Y = date.getFullYear() + '年'
      const M = date.getMonth() < 10 ? '0' + date.getMonth() + '月' : date.getMonth() + '月'
      const D = date.getDate() < 10 ? '0' + date.getDate() + '日' : date.getDate() + '日'
      return Y + M + D
    },
    playTime(timestamp) {
      const date = new Date(timestamp)
      const M = date.getMinutes()
      const S = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
      return M + ':' + S
    },
    onPlay() {
      this.setIndex({index: 0})
      this.getCurrentTrack()
      this.setPlay()
    }
  },

}
</script>

<style scoped>


.info {
  height: 400px;
  width: 100%;
  display: flex;
}

.cover img {
  width: 300px;
  height: 300px;
  border-radius: 12px;

}

.description {
  margin-left: 70px;
  flex: 1;
}

.title {
  font-size: 36px;
  font-weight: 700;
  color: #000;
}

.artist {
  font-size: 18px;
  margin-top: 24px;
  color: #000;
}

.wyy {
  text-decoration: none;
  color: #000;
}

.wyy:hover {
  text-decoration: underline;
}

.date-and-count {
  font-size: 14px;
  margin-top: 2px;
  color: #000;
  opacity: .68;
}

.tips {
  margin-top: 12px;
  color: #000;
  opacity: .68;
  cursor: pointer;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}

.tips:hover {
  opacity: 100%;
}

.buttons {
  display: flex;
  margin-top: 32px;
}

.button {
  margin-right: 10px;
  padding: 4px 10px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background: #f5f5f7;
  height: 40px;
  min-width: 40px;
  transition: .2s linear;
}

.button.play {
  color: #335eea;
  font-weight: 600;
  background: rgb(234, 239, 253);
  font-size: 18px;
}

.button:hover {
  height: 45px;
}

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
