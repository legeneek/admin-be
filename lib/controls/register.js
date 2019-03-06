const bcrypt = require('bcryptjs')
const User = require('../models/user.model')

module.exports = async function register(ctx) {
  const { body } = ctx.request
  if (!body.username || !body.password) {
    ctx.throw(401)
  }
  // TODO: data validation
  body.password = await bcrypt.hash(body.password, 5)
  let user = await User.find({username: body.username})
  if (!user.length) {
    user = await new User({
      username: body.username, 
      password: body.password,
      roles: body.roles
    }).save()
    ctx.body = {
      message: 'register success',
      user: {
        username: user.username,
        roles: user.roles
      }
    }
  } else {
    ctx.status = 406
    ctx.body = 'user already exist'
  }
}