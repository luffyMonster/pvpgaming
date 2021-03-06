'use strict';

var express = require('express');
var controller = require('./game.controller');

var router = express.Router();

router.get('/list', controller.getAll);
router.get('/getByName', controller.getByName);
router.get('/getTop3', controller.getTop3);
router.put('/edit',controller.edit);
router.delete('/delete',controller.deleteGame);
router.post('/create',controller.addGame);
router.post('/rateupdate',controller.rateUpdate);
router.get('/getRatedAvg', controller.getRatedAvg);
router.get('/getUserRatedById', controller.getUserRatedById);
module.exports = router;
