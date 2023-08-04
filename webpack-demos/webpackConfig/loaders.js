const loader1 = source => {
    console.log('=>sourcesource', source)
    return (source += '注释111111111')
}
const loader2 = source => {
    return (source += '注释2222222')
}

module.exports = {
    loader1,
    loader2,
}
