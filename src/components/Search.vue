<template>
  <div id="search-page">
    <h1>发现</h1>
    <div class="buttons">
      <div class="button"
           @click="showTop"
           :class="
                $route.query.category === category ? 'active' : ''"
           v-for="category in categories" :key="category">{{ category }}
      </div>
      <div class="button" @click="showMore">...</div>
    </div>
    <div class="panel" v-show="isMore">

      <div class="big-cat" v-for="(item,index) in bigCats" :key="index">
        <div class="name"><span>{{ item }}</span></div>
        <div class="cats">
          <div class="cat" v-for="s in path[index]" :key="s.name" :class="
                categories.indexOf(s.name) > -1 ? 'active' : ''" @click.stop="() => showCat(s)">
            <span>{{ s.name }}</span>
          </div>
        </div>
      </div>
    </div>
    <Playlist :playlists="playlists"/>
  </div>
</template>

<script>

import Category from '@/apis/category'
import Playlist from "@/components/Playlist";

export default {
  name: "Search",
  data() {
    return {
      isMore: false,
      categories: ['全部'],
      sub: [],
      bigCats: [],
      path: {},
      isActive: false,
      allCats: [],
      playlists: [],

    }
  },
  components: {Playlist},
  created() {
    Category.catList()
        .then(res => {
              this.bigCats = res.data.categories
              this.allCats = res.data.sub
              this.allCats.forEach(item => {
                    if (!this.path[item.category]) {
                      this.path[item.category] = []
                    }
                    this.path[item.category].push(item)
                  }
              )
              const c = localStorage.getItem('categories').split(',') || ''
              c.splice(0, 1)
              this.categories = this.categories.concat(c)
            }
        )
    Category.toplist({cat: this.$route.query.category})
        .then(res => {
          this.playlists = res.data.playlists
        })
  },
  methods: {
    showMore() {
      this.isMore = !this.isMore
    },
    showTop(e) {
      const query = e.target.innerText
      this.$router.push({path: '/search', query: {category: query}})
      Category.toplist({cat: query})
          .then(res => {
            this.playlists = res.data.playlists
          })
    },
    showCat(e) {
      const index = this.categories.indexOf(e.name)
      if (index > -1) {
        this.categories.splice(index, 1)
      } else {
        this.categories.push(e.name)
      }
      localStorage.setItem('categories', this.categories)
    }
  }
};
</script>

<style scoped>
h1 {
  color: black;
  font-size: 56px;
  margin: 40px 0;
}

.buttons {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}

.buttons .button {
  /*height: 40px;*/
  border-radius: 8px;
  color: rgb(126, 126, 127);
  font-size: 18px;
  padding: 8px 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 16px 6px 0;
  background: rgb(245, 245, 247);
  cursor: pointer;
  font-weight: 600;
}

.button.active {
  color: blue;
}

.button:hover {
  background: rgb(234, 239, 253);;
  color: rgb(51, 94, 234);
}

.panel {
  background: rgb(245, 245, 247);
  border-radius: 12px;
  display: flex;
  padding: 10px;
  flex-wrap: wrap;
}

.big-cat {
  display: flex;
  margin-bottom: 32px;
  width: 100%;
  align-items: center;
}

.big-cat .name {
  font-size: 24px;
  font-weight: 700;
  opacity: .68;
  margin-left: 24px;
  min-width: 54px;
  height: 26px;
  margin-top: 8px;
}

.cats {
  display: flex;
  flex-wrap: wrap;
}

.cat {
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
  margin: 10px 20px -6px 20px;
  cursor: pointer;
  border-radius: 6px;
}

.cat.active {
  color: blue;
}

.cat:hover {
  background: rgb(234, 239, 253);;
  color: rgb(51, 94, 234);
}
</style>
