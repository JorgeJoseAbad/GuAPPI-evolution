

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true
  },
  email: String,
  password: String,
  address: String,
  latitude:{
    type: Number,
    required: false
  },
  longitude:{
    type: Number,
    required: false
  },
  imgUrl     : {
    type: String,
    default: "https://placeholdit.imgix.net/~text?txtsize=33&txt=250%C3%97250&w=250&h=250"
  }
}, {
      timestamps: {
          createdAt: "created_at",
            updatedAt: "updated_at"
            }
});

module.exports = mongoose.model('User', userSchema);
