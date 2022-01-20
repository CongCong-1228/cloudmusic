function getTime(currentTime) {
    if (currentTime < 60) {
        return '0:0' + currentTime
    }
    if (currentTime > 60) {
        return Math.fround(currentTime / 60) + ':' + currentTime % 60
    }
}
