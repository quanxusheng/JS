// import Animal from './other'
const Animal = require('./other.js')
const fn = () => {
  console.log('=>', 'hello 222')
}
fn()

let cat = new Animal()
console.log('=>cat.name', cat)
console.log('=>cat.name', cat.name)