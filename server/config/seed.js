/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Magnet = require('../api/magnet/magnet.model');

Magnet.find({}).remove(function() {
  Magnet.create(
    {
      character: "i",
      color: "red",
      x: 0,
      y: 0,
      rotation: 360,
      selected: null
    },
    {
      character: "a",
      color: "blue",
      x: 10,
      y: 0,
      rotation: 180,
      selected: null
    },
    {
      character: "n",
      color: "green",
      x: 20,
      y: 0,
      rotation: 270,
      selected: null
    }
  );
});
