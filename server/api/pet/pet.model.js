'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SPECIES = [
  "cat",
  "bird",
  "snake",
  "turtle",
];

const petSchema = new mongoose.Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true, //indice relacional propietario
  },

  name: {
    type: String,
    required: true
  },

  specie: {
    type: String,
    enum: SPECIES
  },

   breed: {
     type: String,
     required: false
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


module.exports = mongoose.model('Pet', petSchema);
