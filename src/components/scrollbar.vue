<template>
  <div class="container" @click="handle">
    <div class="scrollbar" ref="scrollbar">
    </div>
  </div>
</template>


<script>
export default {
  name: 'Scrollbar',
  data() {
    return {
      moveY: '',
      box: '',
    }
  },
  props:['viewheight'],
  mounted() {
    this.box = this.$refs.scrollbar
    window.addEventListener('scroll', () => {
      this.box.style.transform = `translateY(${window.scrollY}px)`
    })

  },
  methods: {
    handleScroll() {
    },
    handle(e){
      console.log(e.pageY)

      this.box.style.transform = `translateY(${e.offsetY}px)`

    }


  }
}
</script>


<style scoped>
.container {
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  height: 100%;
  width: 16px;
}

.scrollbar {
  background: #335eea;
  border-radius: 12px;
  border: 1px solid red;
  height: 64px;
  width: 100%;
  margin-top: 64px;
  transition: all .3s;
}
</style>
