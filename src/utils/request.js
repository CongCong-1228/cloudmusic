import axios from 'axios'

axios.defaults.baseURL = 'http://8.130.102.64:3000/'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.withCredentials = true


export default function request(url, type = 'GET', data = {}) {
    return new Promise((resolve, reject) => {
        const options = {
            url,
            method: type,
        }
        if (type === 'GET') {
            options.params = data
        } else {
            options.data = data
        }
        axios(options)
            .then(res => {
                resolve(res)
            })
            .catch(res => {
                reject(res)
            })
    })
}

