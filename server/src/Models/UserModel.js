const mongoose  = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
  id: ObjectId,
  name: String,
  email: String,
  password: String,
  username: String
});

const UserModel = mongoose.model('users', UserSchema);

module.exports = UserModel;