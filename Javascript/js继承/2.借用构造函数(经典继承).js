function Parent() {
  this.colors = ['red', 'yellow']
}
function Child() {
  Parent.call(this)
}
var c1 = new Child()
var c2 = new Child()
c1.colors.push('white')
console.log('=>', c1)
console.log('=>', c2)

