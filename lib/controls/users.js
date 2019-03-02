const User = require('../models/user.model')

module.exports = async function users(ctx) {
  const users = await User.find({}, 'username roles id')
  ctx.body = users
}