export default function throttle(f, time,asthis) {
    let coolDown = false
    return function (...args) {
        if (coolDown) return
        console.log(asthis)
        f.call(asthis, ...args)
        coolDown = true
        let timer = setTimeout(() => {
            coolDown = false
            clearTimeout(timer)
        }, time)
    }
}

// how to use throttle function

// First    import throttle from '@/utils/throttle.js

// Second   throttle(fn(),time)  function throttle need two arguments,
//          a fn() what you what to do, and how coolDown you can use next time

// Third    you can also give arguments to your fn()


//      const flash = throttle(fn(),time)
//      flash()


// 适用场景，按钮点击，可以设置每几秒可以点击一次按钮，
