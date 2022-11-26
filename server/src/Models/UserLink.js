const mongoose  = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserLinkSchema = new Schema({
  id: ObjectId,
  user_id: {
    type: String,
    ref: 'users'
  },
  title: String,
  destination: String
});

const UserLink = mongoose.model('user_links', UserLinkSchema);

module.exports = UserLink;