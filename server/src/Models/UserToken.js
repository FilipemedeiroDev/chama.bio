const mongoose  = require("mongoose");
const crypto = require('crypto');


const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserTokenSchema = new Schema({
  id: ObjectId,
  user: {type: Schema.Types.ObjectId, ref: 'users' },
  code: {
    type: String,
    default: crypto.randomUUID
  },
  expiresAt: Date,
  confimationtype: String
});

const UserToken = mongoose.model('user_tokens', UserTokenSchema);

module.exports = UserToken;

