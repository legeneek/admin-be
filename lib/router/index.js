const Router = require('koa-router')
const router = new Router()

const registerCtl = require('../controls/register')
const usersCtl = require('../controls/users')
const loginCtl = require('../controls/login')

router.post('/register', registerCtl)
router.get('/users', usersCtl)
router.post('/login', loginCtl)

module.exports = router