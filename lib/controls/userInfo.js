const User = require('../models/user.model')

module.exports = async function userInfo(ctx) {
  const username = ctx.payload && ctx.payload.username
  try {
    const user = await User.findOne({username}, 'username roles')
    ctx.body = user
  } catch (e) {
    ctx.throw(500, 'failed to get user info')
  }
}
