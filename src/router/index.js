import Vue from 'vue'
import Router from 'vue-router'
import Music from '@/components/Music'
import Login from '@/components/Login'
import Search from '@/components/Search'
import MusicDetail from '@/components/Musicdetail'
import Next from '@/components/next'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Search',
            component: Search,
        },
        {
            path: '/search',
            name: 'Search',
            component: Search,
        },
        {
            path: '/login',
            name: 'Login',
            component: Login,

        },
        {
            path: '/playlist/:id',
            name: 'Musicdetail',
            component: MusicDetail,
        },

        {
            path: '/music',
            name: 'Music',
            component: Music,
            meta: {
                needLogin: true
            }
        },
        {
            path: '/next',
            name: 'next',
            component: Next,
            meta: {
                needList: true
            }
        }
    ]
})
