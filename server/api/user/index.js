'use strict';

var express = require('express');
var controller = require('./user.controller');
var auth = require('../auth/auth.service');

var router = express.Router();

router.get('/account/:account', controller.findByAccount);
router.get('/name/:name', controller.findByName);
router.get('/gender/:gender', controller.findByGender);
router.get('/find', controller.find);
router.put('/edit',controller.edit);
router.delete('/delete',controller.deleteUser);
router.post('/create',controller.addUser);
router.get('/dashboard', auth.isAuthenticated(), (req, res)=>{
  console.log(req.user);
  res.send(req.user);
});
router.get('/logout', auth.isAuthenticated(), (req, res)=>{
  req.logout();
  res.send({message: ' You are logged out!'})
  req.redirect('/');
});
// router.get('/test', auth.isAuthenticated(), (req, res) => {
//   res.end("chua login thi ko dc vao!, da nhin thay dong chu nay thi la da login!");
// });
// //cai hasRole no bao gom ca isAuthen ben trong r nh
// router.get('/test2', auth.hasRole('admin'), (req, res) => {
//   res.end("co role la 'admin' moi vao duoc");
// });
module.exports = router;
