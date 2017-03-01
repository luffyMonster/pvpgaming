'use strict';

var express = require('express');
var controller = require('./test.controller');
//var auth = require('../auth/auth.service');

var router = express.Router();

router.get('/all', controller.findAll);
router.post('/add', controller.add);

module.exports = router;
