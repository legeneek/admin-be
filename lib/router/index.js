const Router = require('koa-router')
const router = new Router()

const csrfMid = require('../middlewares/csrf')
const registerCtl = require('../controls/register')
const usersCtl = require('../controls/users')
const loginCtl = require('../controls/login')

router.post('/register', registerCtl)
router.get('/users', csrfMid, usersCtl)
router.post('/login', loginCtl)

module.exports = router