(function () {

    /* global io */
    'use strict';

    angular.module('magnetsApp')
        .factory('socket', socketService);

        function socketService (socketFactory) {

            // socket.io now auto-configures its connection when we ommit a connection url
            var ioSocket = io('', {
                // Send auth token on connection, you will need to DI the Auth service above
                // 'query': 'token=' + Auth.getToken()
                path: '/socket.io-client'
            });

            var socket = socketFactory({
                ioSocket: ioSocket
            });

            return {
                socket: socket,

                syncSocket: function (model) {

                    socket.on('socket:connect', function (id, count) {
                        if (!model.id) {
                            model.id = id;
                        }
                        model.count = count;
                    });

                    socket.on('socket:disconnect', function (id, count) {
                        model.count = count;
                    });
                },

                /**
                 * Register listeners to sync an array with updates on a model
                 *
                 * Takes the array we want to sync, the model name that socket updates are sent from,
                 * and an optional callback function after new items are updated.
                 *
                 * @param {String} modelName
                 * @param {Array} array
                 * @param {Function} cb
                 */
                syncUpdates: function (modelName, array, cb) {
                    cb = cb || angular.noop;

                    /**
                     * Syncs item creation/updates on 'model:save'
                     */
                    socket.on(modelName + ':save', function (item) {
                        var oldItem = _.find(array, {_id: item._id});
                        var event = 'created';

                        // replace oldItem if it exists
                        // otherwise just add item to the collection
                        if (oldItem) {
                            _.merge(oldItem, item);
                            event = 'updated';
                        } else {
                            array.push(item);
                        }

                        cb(event, item, array);
                    });

                    /**
                     * Syncs removed items on 'model:remove'
                     */
                    socket.on(modelName + ':remove', function (item) {
                        var event = 'deleted';
                        _.remove(array, {_id: item._id});
                        cb(event, item, array);
                    });
                },

                /**
                 * Removes listeners for a models updates on the socket
                 *
                 * @param modelName
                 */
                unsyncUpdates: function (modelName) {
                    socket.removeAllListeners('socket:disconnect');
                    socket.removeAllListeners('socket:connect');
                    socket.removeAllListeners(modelName + ':save');
                    socket.removeAllListeners(modelName + ':remove');
                }
            };
        }
})();

