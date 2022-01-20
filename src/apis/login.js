import request from '@/utils/request'

const URL = {
    'LOGIN_KEY': 'login/qr/key',
    'QR_CREATE': 'login/qr/create',
    'QR_CHECK': 'login/qr/check',
}
export default {
    loginKey({key, timestamp}) {
        return request(URL.LOGIN_KEY, 'GET', {key, timestamp})
    },
    qrCreate({key}) {
        return request(URL.QR_CREATE, 'GET', {key})
    },
    // eslint-disable-next-line no-unused-vars
    qrCheck({key}) {
        return request(URL.QR_CHECK, 'GET', {key, t: Math.random()})
    }

}
