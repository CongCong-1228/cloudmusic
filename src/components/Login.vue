<template>
  <div id="account">
    <div class="login">
      <div class="section-1">
        <img src="@/assets/img/netease-music.png" alt="">
      </div>
      <div class="title">
        登陆网易云账号
      </div>
      <div class="qrcode">
        <div class="loading" v-show="isLoading">
          <svg-icon icon-class="yes" class="yes"></svg-icon>
        </div>
        <img :src="QRCode_URL" alt="">
      </div>
      <div class="tips">打开网易云音乐APP扫码登录</div>
    </div>
  </div>
</template>

<script>
import Login from '@/apis/login'
import QRcode from 'qrcode'
import User from '@/apis/user'


export default {
  data() {
    return {
      QRCode_URL: '',
      darkColor: '#335eea',
      isLoading: false,
      key: '',
      Id: '',
      cookie: ''
    }
  },
  created() {
    Login.loginKey({})
        .then(res => {
          this.key = res.data.data.unikey
          QRcode.toDataURL(`https://music.163.com/login?codekey=${res.data.data.unikey}`, {
            color: {dark: this.darkColor,},
            margin: 0
          }).then(res => {
            this.QRCode_URL = res
          })
        })
    const call = () => {
      Login.qrCheck({key: this.key})
          .then(rq => {
            if (rq.data.code === 800) {
              clearInterval(this.Id)
              Login.loginKey({})
                  .then(res => {
                    this.key = res.data.data.unikey
                    QRcode.toDataURL(`https://music.163.com/login?codekey=${res.data.data.unikey}`, {
                      color: {dark: this.darkColor,},
                      margin: 0
                    }).then(res => {
                      this.QRCode_URL = res
                    })
                  })
              let Id = setInterval(call, 1000)
              this.Id = Id
            }
            if (rq.data.code === 801) {

              return
            }
            if (rq.data.code === 802) {
              this.isLoading = true
            }
            if (rq.data.code === 803) {
              clearInterval(Id)
              User.account_message()
                  .then(res => {
                    this.cookie = rq.data.cookie.split(' ').filter(item => !item.includes('Path=')).join(' ')
                    document.cookie = this.cookie
                    localStorage.setItem('data', JSON.stringify(res.data.profile))
                    let url = this.$route.query.successUrl;
                    // because api so slow
                    if (this.$route.path === '/login') {
                      if (url) {
                        this.$router.push(url)
                      } else {
                        this.$router.push('/')
                      }
                    }
                  })
            }

          })
    }
    let Id = setInterval(call, 1000)
    this.Id = Id
  },
  beforeDestroy() {
    clearInterval(this.Id);
  }

}
</script>

<style scoped>
#account {
  margin-top: 40px;
}

.login {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.section-1 {
  margin-bottom: 20px;
}

.section-1 img {
  height: 64px;
  width: 64px;
  margin: 20px;
}

.title {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 48px;
}

.qrcode {
  padding: 20px;
  border-radius: 16px;
  background-color: #eaeffd;
  margin-bottom: 20px;
}

.loading {
  height: 200px;
  width: 200px;
  position: absolute;
  background: #eaeffd;
  display: flex;
  justify-content: center;
  align-items: center;
}

.yes {
  height: 50px;
  width: 50px;
  color: red;
}

.qrcode img {
  height: 200px;
  width: 200px;
}

.tips {
  margin-bottom: 40px;
}

</style>
