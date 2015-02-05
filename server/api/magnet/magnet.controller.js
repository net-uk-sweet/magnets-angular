/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /magnets              ->  index
 * POST    /magnets              ->  create
 * GET     /magnets/:id          ->  show
 * PUT     /magnets/:id          ->  update
 * DELETE  /magnets/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Magnet = require('./magnet.model.js');

// Get list of magnets
exports.index = function(req, res) {
  Magnet.find(function (err, magnets) {
    if(err) { return handleError(res, err); }
    return res.json(200, magnets);
  });
};

// Get a single magnet
exports.show = function(req, res) {
  Magnet.findById(req.params.id, function (err, magnet) {
    if(err) { return handleError(res, err); }
    if(!magnet) { return res.send(404); }
    return res.json(magnet);
  });
};

// Creates a new magnet in the DB.
exports.create = function(req, res) {
  Magnet.create(req.body, function(err, magnet) {
    if(err) { return handleError(res, err); }
    return res.json(201, magnet);
  });
};

// Updates an existing magnet in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Magnet.findById(req.params.id, function (err, magnet) {
    if (err) { return handleError(res, err); }
    if(!magnet) { return res.send(404); }
    var updated = _.merge(magnet, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, magnet);
    });
  });
};

// Deletes a magnet from the DB.
exports.destroy = function(req, res) {
  Magnet.findById(req.params.id, function (err, magnet) {
    if(err) { return handleError(res, err); }
    if(!magnet) { return res.send(404); }
    magnet.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
