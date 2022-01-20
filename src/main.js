import Vue from 'vue'
import App from './App.vue'
import '@/assets/icons/index'
import router from './router'
import store from '@/store'
import './router/router.config'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import '@/mock/mock'
Vue.config.productionTip = false

Vue.use(ElementUI)


new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
