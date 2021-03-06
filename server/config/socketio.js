/**
 * Socket.io configuration
 */

'use strict';

var config = require('./environment');
var count = 0;

function onDisconnect(sockets, socket) {
  sockets.emit('socket:disconnect', socket.id, -- count);
  console.info('[%s] has disconnected, there are now %s users connected', socket.id, count);
}

// When the user connects.. perform this
function onConnect(sockets, socket) {

  sockets.emit('socket:connect', socket.id, ++ count);
  console.info('[%s] is one of %s users to have connected', socket.id, count);

  // When the client emits 'info', this listens and executes
  socket.on('info', function (data) {
    console.info('[%s] %s', socket.address, JSON.stringify(data, null, 2));
  });

  // Insert sockets below
  require('../api/magnet/magnet.socket').register(socket);
}

module.exports = function (socketio) {
  // socket.io (v1.x.x) is powered by debug.
  // In order to see all the debug output, set DEBUG (in server/config/local.env.js) to including the desired scope.
  //
  // ex: DEBUG: "http*,socket.io:socket"

  // We can authenticate socket.io users and access their token through socket.handshake.decoded_token
  //
  // 1. You will need to send the token in `client/components/socket/socket.service.js`
  //
  // 2. Require authentication here:
  // socketio.use(require('socketio-jwt').authorize({
  //   secret: config.secrets.session,
  //   handshake: true
  // }));

  socketio.on('connection', function (socket) {
    socket.address = socket.handshake.address !== null ?
            socket.handshake.address.address + ':' + socket.handshake.address.port :
            process.env.DOMAIN;

    socket.connectedAt = new Date();

    // Call onDisconnect.
    socket.on('disconnect', function () {
      onDisconnect(socketio.sockets, socket);
    });

    // Call onConnect.
    onConnect(socketio.sockets, socket);
  });
};
