const loader1 = source => {
    return (source += 'loader1的注视')
}
const loader2 = source => {
    return (source += 'aaa')
}

module.exports = {
    loader1,
    loader2,
}
