const mongoose  = require("mongoose");

const Schema = mongoose.Schema;

const UserProfileSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  description:{
    type: String,
    default: null
  },
  avatarUrl: {
    type: String,
    default: null
  },
  background_color:{
    type: String,
    default: null
  },
  background_button_color: {
    type: String,
    default: null
  },
  text_color: {
    type: String,
    default: null
  },
});

const UserProfileModel = mongoose.model('user_profile', UserProfileSchema);

module.exports = UserProfileModel;