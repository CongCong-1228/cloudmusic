<template>
  <div id="music">
    <div class="title">

      <img class="img" :src="this.data.avatarUrl" alt="">

      <h1>{{ this.data.nickname }}的音乐库</h1>
    </div>
    <div class="section-1">
      <div class="card">
        <div class="top">
          <p>
            <span>あの日の苦しみさえ</span>
            <span>その全てを愛してたあなたと共に</span>
            <span>胸に残り離れない</span>
          </p>
        </div>
        <div class="bottom">
          <div class="likes">
            <div class="tit">我喜欢的音乐</div>
            <div class="sub-tit">101首歌</div>
          </div>
          <div class="button">
            <svg-icon iconClass="play" style="color: #fff"></svg-icon>
          </div>
        </div>
      </div>
      <div class="track-lists">
        <div class="track" v-for="track in tracks"
             :key="track.title">
          <img :src="track.al.picUrl" alt="" class="bg">
          <div class="tit-ava">
            <div class="tit">{{ track.name }}</div>
            <div class="ava">{{ track.ar[0].name }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="section-2">
      <div class="tabs">
        <div class="tab">全部歌曲</div>
      </div>
      <div class="musiclist">
        <div class="item" v-for="item in playlist" :key="item.id">
          <div class="wrapper">
            <router-link :to="`/playlist/${item.id}`">
              <img :src="item.coverImgUrl" alt="" class="bg">
              <div class="playButton">
                <svg-icon icon-class="play_fill"></svg-icon>
              </div>
            </router-link>
          </div>

          <div class="text">
            <router-link to="#" class="t" style="color: #000;">{{ item.name }}</router-link>
            <div class="tips">by{{ item.creator.nickname }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import User from '@/apis/user'
// import Song from '@/apis/song'
import Category from '@/apis/category'

export default {
  name: "Music",
  data() {
    return {
      uid: '',
      selected: false,
      trackList: [
        {
          imgUrl: '图片',
          title: '0',
          avatar: '作者'
        },
        {
          imgUrl: '图片',
          title: '1',
          avatar: '作者'
        },
        {
          imgUrl: '图片',
          title: '2',
          avatar: '作者'
        },
        {
          imgUrl: '图片',
          title: '3',
          avatar: '作者'
        },
      ],
      tracks: [],
      data: '',
      songIds: [],
      likeId: '',
      playlist: [],
    };
  },
  computed: {},
  methods: {},
  created() {
    this.data = JSON.parse(localStorage.getItem('data'))
    // console.log(this.data)
    this.uid = this.data.userId
    // User.user_detail({id: this.uid})
    //     .then(res => {
    //       console.log(res)
    //     })

    User.subcount_message({uid:this.uid})
        .then(res => {
          console.log(res)
        })
    User.user_playlist({uid: this.uid})
        .then(res => {
          this.likeId = res.data.playlist[0].id
          res.data.playlist.splice(0, 1)
          this.playlist = res.data.playlist
          Category.detailList({id: this.likeId})
              .then(res => {
                this.tracks = res.data.playlist.tracks
              })
        })
    // User.user_likelist({uid: this.uid})
    //     .then(res => {
    //       // console.log(res.data.ids)
    //       this.songIds = res.data.ids
    //       Song.song_url({id: this.songIds.join(',')})
    //           .then(res => {
    //             console.log(res)
    //           })
    //     })

    // User.user_likelist({uid: this.uid})
    //     .then(res => {
    //       // console.log(res.data.ids)
    //       this.songIds = res.data.ids
    //     })
  }
};
</script>

<style scoped>
.title {
  color: #000;
  display: flex;
  align-items: center;
}

.title .img {
  height: 45px;
  width: 45px;
  border-radius: 50%;
  margin-right: 15px;
}

.section-1 {
  margin-top: 20px;
  display: flex;
  height: 256px;
}

.card {
  padding: 18px 24px;
  background: #eaeffd;
  border-radius: 16px;
  flex: 3;
  cursor: pointer;
  flex-direction: column;
}

.card .top {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  font-size: 14px;
  opacity: .88;
  color: #335eea;;
}

.card .top p {
  min-height: 150px;
  display: flex;
  flex-wrap: wrap;
}

.card .top p span {
  display: block;
  width: 100%;
}

.card .bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #335eea;
}

.section-1 .track-lists {

  flex: 7;
  margin-top: 8px;
  margin-left: 36px;
  overflow: hidden;
  display: grid;
  gap: 4px;
  grid-template-columns: repeat(3, 1fr);
}

.bottom .likes {

}

.bottom .likes .tit {
  font-size: 24px;
  font-weight: 700;
}

.bottom .likes .sub-tit {
  font-size: 15px;
  margin-top: 2px;
}

.bottom .button {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 44px;
  width: 44px;
  background: #335eea;
  border-radius: 50%;
}

.track {
  display: flex;
  align-items: center;
  padding: 8px;
  border-radius: 16px;
  height: 40px;

}

.track:focus {
  background: #eaeffd;
  color: #335eea;
}

.track .bg {
  height: 36px;
  width: 36px;
  border: 1px solid;
  cursor: pointer;
  border-radius: 6px;

}

.track .tit-ava {
  margin-left: 10px;
}

.tit-ava .tit {
  font-size: 16px;
  font-weight: 600;
  cursor: default;
  padding-right: 16px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  word-break: break-all;
}

.tit-ava .ava {
  font-size: 12px;
}

.section-2 {
  height: 500px;
  margin-top: 30px;
  width: 100%;

}

.section-2 .tabs {
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  margin-bottom: 20px;
}

.tabs .tab {
  border-radius: 8px;
  color: #000;
  font-weight: 600;
  font-size: 18px;
  padding: 8px 14px;
  cursor: pointer;
}

.tab:hover {
  background: #f5f5f7;
}

.musiclist {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 44px 24px;
}

.musiclist .bg {
  width: 100%;
  aspect-ratio: 1/1;
}

.musiclist .t {
  text-decoration: none;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  font-weight: 600;
  line-height: 20px;
  word-break: break-all;
}

.musiclist .tips {
  font-size: 12px;
  opacity: .68;
  line-height: 18px;
  word-break: break-word;
}

.wrapper {
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  border: 1px solid #f5f5f7;
  position: relative;
}

.playButton {
  position: absolute;
  height: 30px;
  width: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: hsla(0, 0%, 100%, .14);
  color: aliceblue;
  border-radius: 50%;
  opacity: 0;
}

.wrapper:hover {
  cursor: pointer;
}

.wrapper:hover .playButton {
  opacity: 1;
  cursor: default;
}

</style>
