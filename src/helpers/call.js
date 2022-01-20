import Login from "@/apis/login";

const _this = this
const call = function ({key}) {
    setTimeout(() => {
        Login.qrCheck({key})
            .then(res => {
                console.log(this)
                if (res.data.code === 801) {
                    call({key})
                }
                if (res.data.code === 802) {
                    call({key})
                }
                if (res.data.code === 803) {
                    _this.$router.push({path: '/music'})
                }
            })
    }, 1000)
}
export {call}

