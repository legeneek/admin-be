const mongoose = require('mongoose')
const Schema = mongoose.Schema

let UserSchema = new Schema({
  username: String,
  password: String,
  roles: Array
})

module.exports = mongoose.model('User', UserSchema)
