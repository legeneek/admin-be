const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const mongoose = require('mongoose')
const cors = require('@koa/cors')
const jwt = require('koa-jwt')

const router = require('./router')
const { getSecret } = require('./utils/secret')
const dbUrl = `mongodb://localhost:27017/admin_manage`

mongoose.connect(dbUrl, {useNewUrlParser: true})

const app = new Koa()

app.use(bodyParser())
app.use(cors())

app.use((ctx, next) => {
  return next().catch((e) => {
    if (401 === e.status) {
      ctx.status = 401
      ctx.body = ''
    } else {
      throw e
    }
  })
})

app.use(jwt({secret: getSecret()}).unless({
  path: [/\/register/, /\/login/]
}))

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(9000, () => {
  console.log('server listening at 9000.')
})