module.exports = function (source) {
  const callback = this.async()
  setTimeout(() => {
    callback(null, `${source.replace(/console.log/g, '')}`)
  }, 5000)
}