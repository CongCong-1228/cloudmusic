import request from '@/utils/request'

const URL = {
    'USER_ACCOUNT_MESSAGE': 'user/account',
    'USER_SUBCOUNT_MESSAGE': 'user/subcount',
    'USER_DETAIL': 'user/detail',
    'USER_PLAYLIST': 'user/playlist',
    'USER_LIKELIST': '/likelist'
}
export default {
    account_message() {
        return request(URL.USER_ACCOUNT_MESSAGE, 'GET', {})
    },
    subcount_message({uid}) {
        return request(URL.USER_SUBCOUNT_MESSAGE, 'GET', {uid})
    },
    user_detail({id}) {
        return request(URL.USER_DETAIL, 'GET', {id})
    },
    user_playlist({uid}) {
        return request(URL.USER_PLAYLIST, 'GET', {uid})
    },

    user_likelist({uid}) {
        return request(URL.USER_LIKELIST, 'GET', {uid})
    }


}
