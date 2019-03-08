const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user.model')
const secret = require('../config/secret')
const Tokens = require('csrf')
const cookieConfig = require('../config/cookie')

const tokens = new Tokens()

module.exports = async function login(ctx) {
  const { body } = ctx.request
  if (!body.username || !body.password) {
    ctx.throw(401, 'user name or password error')
  }
  let user = await User.findOne({username: body.username}, 'username password roles')
  if (!user) {
    ctx.throw(401, 'user name or password error')
  } else {
    let match = await bcrypt.compare(body.password, user.password)
    if (match) {
      const csrfToken = tokens.create(secret.csrf)
      const token = jwt.sign(
        {
          username: user.username,
          roles: user.roles,
          csrfToken: csrfToken,
          exp: Math.floor(Date.now() / 1000) + 3600 * 2
        },
        secret.jwt
      )
      ctx.cookies.set(cookieConfig.jwtTokenKey, token)
      ctx.cookies.set(cookieConfig.csrfTokenKey, csrfToken, {httpOnly: false})
      ctx.body = {
        username: user.username,
        roles: user.roles
      }
    } else {
      ctx.throw(401, 'user name or password error')
    }
  }
}