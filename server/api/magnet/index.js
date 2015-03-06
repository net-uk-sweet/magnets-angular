'use strict';

var express = require('express');
var controller = require('./magnet.controller');

var router = express.Router();

// Route URLs to the correct methods on the controller
router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
