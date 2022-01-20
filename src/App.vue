<template>
  <div id="app">
      <nav>
        <div class="left">
          <div class="button-ico" @click="back">
            <svg-icon iconClass="go-back" style="height: 20px; width: 20px"/>
          </div>
          <div class="button-ico" @click="go">
            <svg-icon iconClass="go-to" style="height: 20px; width: 20px"/>
          </div>
        </div>
        <div class="mid">
          <router-link to="/search" class="button">发现</router-link>
          <router-link to="/music" class="button">音乐库</router-link>
        </div>
        <div class="right">
          <div class="wrapper">
            <svg-icon iconClass="search" class="search"/>
            <input type="text" placeholder="搜索"/></div>
          <div class="user">
            <svg-icon iconClass="User" style="height: 100%; width: 100%"/>
          </div>
        </div>
      </nav>

    <router-view class="main" :key="$route.fullPath"/>
    <Player/>
    <Lyrics class="Lyrics" v-show="this.getLyrics"/>

  <div class="scroll-bar">

  </div>
  </div>

</template>

<script>
import Player from '@/components/Player'
import Lyrics from "@/components/lyrics";
import {mapGetters} from "vuex";

// import Audio from '@/components/Audio'
export default {
  data() {
    return {
      scroll: ''
    }
  },

  components: {Player, Lyrics},
  name: "App",
  computed: {
    ...mapGetters(['getLyrics']),
  },
  watch: {
    scroll() {
      console.log(this.scroll)
    }
  },
  methods: {
    back() {
      this.$router.back()

    },
    go() {
      this.$router.back()
    }

  }

};
</script>

<style>
.scroll-bar {
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  width: 16px;
  z-index: 1000;
}
/*::-webkit-scrollbar {*/
/*  width: 15px;*/
/*}*/

::-webkit-scrollbar {

  display: none;
}
body {
  height: 100%;
  width: 100%;
}
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}
</style>
<style scoped>

#app {
  height: 100%;
  width: 100%;
}

.main {
  padding: 64px 70px 64px 70px;
  height: 100%;
  width: 100%;
}

nav {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 64px;
  background: rgb(255, 255, 255);
  display: flex;
  justify-content: space-between;
  padding: 0 70px;
  align-items: center;
  z-index: 10;
}
.left {
  display: flex;
}
.button-ico {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  padding: 6px 8px;
  border-radius: 6px;
  transition: all .3s;
  background: transparent;
  cursor: pointer;
}
.button-ico:hover {
background: rgba(209,209,214,0.28);

}

.Lyrics {
  height: 0;
  transition: all .3s linear;
}

.Lyrics.show {
  z-index: 99;
  height: 100%;
  width: 100%;
  background: teal;
  position: fixed;
  top: 0;
  bottom: 0;
}

.player {
  position: fixed;
  bottom: 0;
}

/*.svg-left {*/
/*  display: inline-block;*/
/*  height: 20px;*/
/*  width: 20px;*/
/*  margin-right: 50px;*/
/*}*/

/*.svg-right {*/
/*  display: inline-block;*/
/*  height: 20px;*/
/*  width: 20px;*/
/*}*/

.mid {
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  flex: 1;
}

.mid .button {
  display: inline-block;
  height: 40px;
  width: 70px;
  text-align: center;
  line-height: 40px;
  border-radius: 6px;
  margin-left: 20px;
  cursor: pointer;
  color: black;
  font-weight: 700;
  font-size: 18px;
  transition: linear 0.2s;
  text-decoration: none;
}

.mid .button:hover {
  background: rgb(242, 242, 244);
}

.right {
  width: 200px;
  height: 32px;
  margin-right: 40px;
  display: flex;
}

.right input {
  outline: none;
  font-size: 16px;
  font-weight: 600;
  border-radius: 6px;
  width: 96%;
  padding-left: 20px;
  height: 100%;
}

.wrapper {
  position: relative;
}

.wrapper .search {
  position: absolute;
  left: 5px;
  top: 8px;
}

.user {
  height: 32px;
  width: 32px;

  text-align: center;
}

</style>
