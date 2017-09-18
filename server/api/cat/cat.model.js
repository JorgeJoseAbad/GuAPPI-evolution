'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BREED = [
  "Street",
  "Angora",
  "siames",
  "tiger",
];

const catSchema = new mongoose.Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true, //indice relacional propietario
  },

  name: {
    type: String,
    require: true
  },

  breed: {
    type: String,
    enum: BREED,
  },

  age: {
    type: Number,
    require: true
  },

  description: {
    type: String,
    required: true
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


module.exports = mongoose.model('Cat', catSchema);
