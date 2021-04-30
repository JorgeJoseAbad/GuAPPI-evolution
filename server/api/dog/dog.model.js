
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BREED = ["Alsacian","setter","spaniel","chiguagua","podenco","galgo","mastin","alano"];

const dogSchema = new mongoose.Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: false, //indice relacional propietario
    //default: 1111111111
  },

  dogName: {
    type: String,
    require: true
  },

  breed: {
    type: String,
    enum: BREED
  },

  age: {
    type: Number,
    require: true
  },

  description: {
    type: String,
    required: true
  },
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
  },
},{
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});


module.exports = mongoose.model('Dog', dogSchema);
