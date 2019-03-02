const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user.model')
const { getSecret } = require('../utils/secret')

const tokenName = '_tk'

module.exports = async function login(ctx, next) {
  const { body } = ctx.request
  if (!body.username || !body.password) {
    ctx.status = 401
    ctx.body = '用户名或密码错误'
    return
  }
  let user = await User.findOne({username: body.username}, 'username password roles _id')
  if (!user) {
    ctx.status = 406
    ctx.body = '用户找不到'
  } else {
    let match = await bcrypt.compare(body.password, user.password)
    if (match) {
      ctx.cookies.set(tokenName, jwt.sign({user}, getSecret(), {expiresIn: '12h'}))
      ctx.body = {
        user: {
          username: user.username,
          id: user.id,
          roles: user.roles
        }
      }
    } else {
      ctx.status = 401
      ctx.body = '用户名或密码错误'
    }
  }
}