const User = require('../models/user.model')

module.exports = async function users(ctx) {
  const users = await User.find({}, 'username roles')
  ctx.body = users.map((u) => {
    return {
      username: u.username,
      roles: u.roles
    }
  })
}
