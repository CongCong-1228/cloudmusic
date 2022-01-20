import router from './index'

router.beforeEach((to, from, next) => {

        if (to.meta.needLogin) {
            // 判断登录
            let loginJson = localStorage.getItem("data")
            if (loginJson) {
                next()
            } else {
                next({
                    path: '/login', query: {successUrl: to.fullPath}
                })
            }
        }
        // if(to.meta.needList) {
        //     let listStatus = this.$store.state.listStatus
        //     console.log(listStatus)
        // }
       else {
          next()
         }

})
