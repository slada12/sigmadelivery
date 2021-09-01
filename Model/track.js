const mongoose = require('mongoose');

const { Schema } = mongoose;

const MainModel = new Schema({
  trackNumber: String,
  shipperName: String,
  shipperEmail: String,
  shipperTel: String,
  shipperAdd: String,
  recieverName: String,
  recieverEmail: String,
  recieverTel: String,
  recieverAdd: String,
  origin: String,
  dest: String,
  shipStatus: String,
  packageType: String,
  shipType: String,
  shipMode: String,
  payMode: String,
  deliveryDate: String,
  departureTime: String,
  pickupDate: String,
  pickupTime: String,
  comment: String,
  currDest: String,
  wght: String,
});

module.exports = mongoose.model('Track', MainModel);
