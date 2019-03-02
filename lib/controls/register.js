const bcrypt = require('bcryptjs')
const User = require('../models/user.model')

module.exports = async function register(ctx, next) {
  const { body } = ctx.request
  if (!body.username || !body.password) {
    ctx.status = 400
    ctx.body = ''
    return
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
      message: '注册成功',
      user: {
        username: user.username,
        roles: user.roles,
        id: user._id
      }
    }
  } else {
    ctx.status = 406
    ctx.body = '用户已存在'
  }
}