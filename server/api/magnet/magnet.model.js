'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MagnetSchema = new Schema({
  character: String,
  color: String,
  x: Number,
  y: Number,
  rotation: Number,
  selected:String // Might want this to be an id to identify who has it selected
});

module.exports = mongoose.model('Magnet', MagnetSchema);
