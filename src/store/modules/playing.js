import Category from '@/apis/category'
import Song from '@/apis/song'

const state = {
    pauseStatus: true,
    loopStatus: false,
    cycleStatus: false,
    listStatus: false,
    lyricsStatus: false,
    audio: new Audio(),
    index: 0,
    musicList: null,
    currentTrack: {},
    songsId: [],
    currentTime: '',
    duration: '',
    volume: 100,
}
const getters = {

    getPause: state => {
        return state.pauseStatus
    },
    getLoop: state => {
        return state.loopStatus
    },
    getCycle: state => {
        return state.cycleStatus
    },
    getList: state => {
        return state.listStatus
    },
    getLyrics: state => {
        return state.lyricsStatus
    },
    currentTime: state => {
        return state.currentTime
    },
    duration: state => {
        return state.duration
    },
    audio: state => state.audio,

    currentTrack: state => {
        return state.currentTrack
    },
    MusicList: state => {
        return state.musicList
    },
    index: state => {
        return state.index
    },
    percent: state => {
        return state.percent = state.currentTime / state.duration * 100
    },
    volume: state => {
        return state.volume
    },

}
const mutations = {
    listenerCurrentTime: (state) => {
        state.audio.addEventListener('timeupdate', () => {
            state.currentTime = state.audio.currentTime
            state.duration = state.audio.duration
            if (state.audio.ended) {
                state.index += 1
                state.audio.src = state.musicList[state.index].url
                state.audio.play()
                mutations.listenerCurrentTime(state)
                mutations.getCurrentTrack(state)
            }
        })
    },
    localStorageSet: state => {
        localStorage.setItem('progress', JSON.stringify({
            index: state.index,
            currentTime: state.currentTime,
            url: state.musicList[state.index].url,
            percent: state.percent,
            name: state.musicList[state.index].name,
            title: state.musicList[state.index].al.name,
            avatar: state.musicList[state.index].ar[0].name,
            bg: state.musicList[state.index].al.picUrl,
            id: state.musicList[state.index].id,
            dt: state.musicList[state.index].dt
        }))
    },
    setCurrentTrack: state => {
        return state.currentTrack = JSON.parse(localStorage.getItem('progress'))
    },
    playingCurrentTrack(state, payload) {
        state.currentTrack = {
            index: payload.index,
            currentTime: state.currentTime,
            url: state.musicList[state.index].url,
            percent: state.percent,
            name: payload.name,
            title: payload.title,
            avatar: payload.avatar,
            bg: payload.bg,
            id: payload.id,
            dt: payload.dt,
        }
    },
    getCurrentTrack: (state) => {
        return state.currentTrack = {
            index: state.index,
            currentTime: state.currentTime,
            url: state.musicList[state.index].url,
            percent: state.percent,
            name: state.musicList[state.index].name,
            title: state.musicList[state.index].al.name,
            avatar: state.musicList[state.index].ar[0].name,
            bg: state.musicList[state.index].al.picUrl,
            id: state.musicList[state.index].id,
            dt: state.musicList[state.index].dt
        }
    },
    setPlay: state => {
        // mutations.setCurrentTrack()
        if (state.pauseStatus) {
            state.pauseStatus = !state.pauseStatus
            if (state.musicList) {
                if(state.currentTime === 0){
                    if (!state.audio.src) {
                        mutations.nextMusic(state)
                    }
                    state.audio.src = state.musicList[state.index].url
                    state.audio.play()
                    mutations.listenerCurrentTime(state)
                } else {
                    state.audio.play()
                    mutations.listenerCurrentTime(state)
                }

            } else {
                state.audio.src = mutations.setCurrentTrack(state).url
                state.audio.play()
                mutations.listenerCurrentTime(state)
                mutations.getCurrentTrack(state)
            }
        } else {
            state.pauseStatus = !state.pauseStatus

            state.audio.pause()
            mutations.listenerCurrentTime(state)
            mutations.getCurrentTrack(state)
        }
        mutations.localStorageSet(state)
    }

    ,
    nextMusic(state) {
        state.pauseStatus = false
        state.index += 1
        state.audio.src = state.musicList[state.index].url
        if (!state.audio.src) {
            mutations.nextMusic(state)
        }
        mutations.getCurrentTrack(state)
        // mutations.setCurrentTrack()
        if (state.pauseStatus) {
            state.audio.play()
            mutations.listenerCurrentTime(state)
        } else {
            state.audio.pause()
            state.audio.play()
            mutations.listenerCurrentTime(state)
        }
        mutations.localStorageSet(state)
    }
    ,
    lastMusic(state) {
        if ((state.index - 1) < 0) {
            return
        } else {
            state.pauseStatus = false
            state.index -= 1
            state.audio.src = state.musicList[state.index].url
            mutations.getCurrentTrack(state)
            // mutations.setCurrentTrack()
            state.audio.play()
            mutations.listenerCurrentTime()
        }
        mutations.localStorageSet(state)

    }
    ,
    loopMusic(state) {
        state.loopStatus = !state.loopStatus
        if (state.loopStatus) {
            state.audio.loop
        }
    }
    ,
    cycleMusic(state) {
        state.cycleStatus = !state.cycleStatus
        if (state.cycleStatus) {
            state.musicList.sort(() => {
                return Math.random() - 0.5
            })
        }
    }
    ,
    showList(state) {
        state.listStatus = !state.listStatus
    }
    ,
    showLyrics(state) {
        state.lyricsStatus = !state.lyricsStatus
    }
    ,
    setVolume(state, payload) {
        state.volume = payload.volume
        state.audio.volume = payload.volume / 100
    }
    ,
    setIndex(state, payload) {
        state.pauseStatus = true
        state.index = payload.index
    }
    ,
    setPercent(state, payload) {
        // state.currentTime = (payload.percent / 100) * state.duration
        console.log(payload.percent)
        state.percent = payload.percent
        state.audio.currentTime = (payload.percent / 100) * state.duration
    },
    setPause: state => state.pauseStatus = true
}
const actions = {
    getMusicList(context, payload) {
        Category.detailList({id: payload.id})
            .then(res => {
                console.log(res.data.playlist.tracks)
                state.musicList = res.data.playlist.tracks

                state.musicList.forEach(item => state.songsId.push(item.id))
                state.songsId = state.songsId.splice(0, 30)
                Song.song_url({id: state.songsId.join()})
                    .then(res => {
                        res.data.data.sort((a, b) => {
                            return state.songsId.indexOf(a.id) - state.songsId.indexOf(b.id)
                        })
                        state.musicList.forEach((item, index) => {
                            item.url = res.data.data[index].url

                        })

                    })
            })
    }
}

export default {
    state,
    getters,
    mutations,
    actions,
}

