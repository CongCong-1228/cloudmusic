import axios from "axios";

axios.defaults.baseURL =
    "https://netease-cloud-music-api-mocha-zeta.vercel.app/";
axios.defaults.headers.post["Content-Type"] =
    "application/x-www-form-urlencoded";
axios.defaults.withCredentials = true;

export default function request(url, type = "GET", data = {}) {
    return new Promise((resolve, reject) => {
        const options = {
            url,
            method: type,
        };
        if (type === "GET") {
            options.params = data;
        } else {
            options.data = data;
        }
        axios(options)
            .then((res) => {
                resolve(res);
            })
            .catch((res) => {
                reject(res);
            });
    });
}
