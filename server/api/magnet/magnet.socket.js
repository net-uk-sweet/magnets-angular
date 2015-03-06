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
  socket.on('disconnect', function() {
  	onDisconnect(socket);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('magnet:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('magnet:remove', doc);
}

function onDisconnect(socket) {
	// There should only be one or zero magnets selected by this user
	magnet.findOne({ selected: socket.id }, function(err, result) {
	  if (err) return console.log(err);
	  if (result) {
	    result.selected = null;
	    result.save(function(err, magnet) {
	    	if (err) return console.log(err);
	    	// console.log('Deselected magnet', magnet);
	    });
	  }
	});
}
