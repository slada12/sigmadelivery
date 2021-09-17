const mongoose = require('mongoose');

const { Schema } = mongoose;

const onlineModel = new Schema({
  online: Boolean,
});

module.exports = mongoose.model('online', onlineModel);
