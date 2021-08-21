const mongoose = require('mongoose');

const { Schema } = mongoose;

const MainModel = new Schema({
  trackNumber: Number,
  user: String,
  email: String,
  location: String,
});

module.exports = mongoose.model('Main', MainModel);