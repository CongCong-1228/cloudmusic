import request from '@/utils/request'

const URL = {
    'SONG_URL': 'song/url',
    'SONG_lyric': '/lyric'
}
export default {
    song_url({id}) {
        return request(URL.SONG_URL, 'GET', {id})
    },
    song_lyric({id}) {
        return request(URL.SONG_lyric, 'GET', {id})
    }
}
