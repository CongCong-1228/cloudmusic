import axios from "axios";

axios.defaults.baseURL =
    "https://service-p3uyod7z-1316706208.sh.apigw.tencentcs.com/release/";
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
