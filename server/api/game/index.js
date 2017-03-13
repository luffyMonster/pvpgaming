'use strict';

var express = require('express');
var controller = require('./game.controller');

var router = express.Router();

router.get('/list', controller.getAll);
router.put('/edit',controller.edit);
router.delete('/delete',controller.deleteGame);
router.post('/create',controller.addGame);

module.exports = router;
