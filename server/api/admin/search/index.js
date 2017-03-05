'use strict';
var router = require('express').Router();
var controller = require('./search.controller');

router.get('/', controller.search);

module.exports = router;
