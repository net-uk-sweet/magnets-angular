/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var magnet = require('./magnet.model.js');

exports.register = function(socket) {

  // TODO: there's some duplication in the deselectMagnet function below
  // TODO: plus this is a pyramid of dooooom
  magnet.schema.pre('save', function(next) {
    var self = this;
    if (this.newSelected) {
      this.newSelected = false;
      magnet.findOne({ selected: this.selected }, function(err, result) {
        console.log('find one', self.selected);
        if (result) {
          console.log('found one', result.id);
          result.selected = null;
          result.save(function(err, result) {
            if (err) { console.log('Error', err); }
            next();
          })
        }
        next();
      });
    } else {
      next();
    }
  });

  magnet.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  magnet.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
  socket.on('disconnect', function() {
  	deselectMagnet(socket);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('magnet:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('magnet:remove', doc);
}

function deselectMagnet(socket) {
	// There should only be one or zero magnets selected by this user
	magnet.findOne({ selected: socket.id }, function(err, result) {
	  // if (err) return console.log(err);
	  if (result) {
	    result.selected = null;
	    result.save(function(err, magnet) {
	    	if (err) return console.log(err);
	    	// console.log('Deselected magnet', magnet);
	    });
	  }
	});
}
