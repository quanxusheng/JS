function Student() {
  this.name = 'ss'
}
Student.prototype.sayName = () => {}
function Teacher() {}
Teacher.prototype = new Student()
let s = new Student()
let t = new Teacher()
// console.log('=>', s instanceof Student) // true

function instance_of(L, R){
  while(true) {
    if (L === null) {
      return false
    } else if (L.__proto__ === R.prototype) {
      return true
    }
    L = L.__proto__
  }
}
console.log('=>', instance_of(t, Student))