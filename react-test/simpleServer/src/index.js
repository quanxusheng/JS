const Koa = require('koa')

const koaApp = new Koa()

koaApp.listen(8888, () => {
  console.log('=>', 'koa8888')
})

koaApp.use(ctx => {
  const {path} = ctx
  console.log('=>path', path)
  if (path === '/student') {
    
  }
})