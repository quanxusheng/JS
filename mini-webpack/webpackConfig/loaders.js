const loader1 = source => {
    return (source += 'loader1的注视')
}
const loader2 = source => {
    return (source += '9999')
}

module.exports = {
    loader1,
    loader2,
}
