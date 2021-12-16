var PASSWORD = Symbol('密码')

class Login{
  constructor(username, password) {
    this.username = username
    this[PASSWORD] = password
  }
  checkPassword(pwd) {
    return this[PASSWORD] === pwd
  }
}

var user = new Login('xusheng', '1234')
console.log('=>', Object.keys(user))
console.log('=>', Object.getOwnPropertySymbols(user))
console.log('=>', Reflect.ownKeys(user))