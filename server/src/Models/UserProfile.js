const mongoose  = require("mongoose");

const Schema = mongoose.Schema;

const UserProfileSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  profile_title: {
    type: String,
    default: ''
  },
  description:{
    type: String,
    default: ''
  },
  avatarUrl: {
    type: String,
    default: ''
  },
  background_color:{
    type: String,
    default: '#ffffff'
  },
  background_button_color: {
    type: String,
    default: '#000000'
  },
  text_color: {
    type: String,
    default: '#000000'
  },
  button_text_color: {
    type: String,
    default: '#ffffff'
  }
});

const UserProfileModel = mongoose.model('user_profile', UserProfileSchema);

module.exports = UserProfileModel;