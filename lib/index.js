const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const mongoose = require('mongoose')
const cors = require('@koa/cors')
const jwt = require('koa-jwt')

const router = require('./router')
const secret = require('./config/secret')
const cookieConfig = require('./config/cookie')
const dbUrl = `mongodb://127.0.0.1:27017/admin_manage`

const app = new Koa()

app.use(cors())
app.use(bodyParser())

app.use((ctx, next) => {
  return next().catch((e) => {
    if (401 === e.status) {
      ctx.status = 401
      ctx.body = e.message || 'authorization error'
    } else {
      throw e
    }
  })
})

app.use(jwt({secret: secret.jwt, cookie: cookieConfig.jwtTokenKey}).unless({
  path: [/\/login/, /\/register/]
}))

app.use(router.routes())
app.use(router.allowedMethods())

let server

//graceful start
mongoose.connect(dbUrl, {useNewUrlParser: true}, (err) => {
  if (err) {
    console.error(err)
    process.exit(1)
  } else {
    server = app.listen(9000, () => {
      console.log('server listening at 9000.')
      process.send && process.send('ready')
    })
  }
})

//graceful shutdown
process.on('SIGINT', () => {
  console.info('SIGINT signal received.')
  
  if (server) {
    server.close((err) => {
      if (err) {
        console.error(err)
        process.exit(1)
      }
  
      mongoose.connection.close(() => {
        console.log('mongoose connection closed')
        process.exit(0)
      })
    })
  }
})