const loader1 = source => {
    return (source += 'loader1的注释')
}
const loader2 = source => {
    return (source += '经过了loader2的处理')
}

module.exports = {
    loader1,
    loader2,
}
