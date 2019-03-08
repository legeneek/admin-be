const jwt = require('jsonwebtoken')

const cookieConfig = require('../config/cookie')
const headerConfig = require('../config/header')
const secret = require('../config/secret')
const roleCheck = require('../utils/roleCheck')

module.exports = function(role) {
  return function (ctx, next) {
    const jwtToken = ctx.cookies.get(cookieConfig.jwtTokenKey)
    const csrfToken = ctx.header[headerConfig.csrf]
  
    let decoded
    try {
      decoded = jwt.verify(jwtToken, secret.jwt)
    } catch (e) {
      ctx.throw(401)
    }
  
    //TODO use constant time compare
    if (decoded.csrfToken === csrfToken) {
      if (role && !roleCheck(role, decoded.roles)) {
        ctx.throw(401, 'no permission')
      }
      return next()
    } else {
      ctx.throw(401)
    }
  }
}