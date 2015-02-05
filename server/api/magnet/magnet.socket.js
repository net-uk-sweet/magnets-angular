/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var magnet = require('./magnet.model.js');

exports.register = function(socket) {
  magnet.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  magnet.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('magnet:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('magnet:remove', doc);
}
