import request from '@/utils/request'

const URL = {
    'CATLIST': 'playlist/catlist',
    'TOP': 'top/playlist',
    'DETAIL': 'playlist/detail',
    'ALLMUSIC': 'song/detail',
    'LOGINKEY': 'login/qr/key'
}

export default {
    catList() {
        return request(URL.CATLIST)
    },
    toplist({limit, cat}) {
        return request(URL.TOP, 'GET', {limit, cat})
    },
    detailList({id}) {
        return request(URL.DETAIL, 'GET', {id, limit:16})
    },
    allMusic({ids}) {
        return request(URL.ALLMUSIC, 'GET', {ids})
    },
    loginKey({ids}) {
        return request(URL.LOGINKEY,'GET',{ids})
    }

}
