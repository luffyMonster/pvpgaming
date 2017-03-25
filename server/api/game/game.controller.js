'use strict';

var Game = require('./game.model');

module.exports = {
  deleteGame: function(req, res){
    Game.findOne({name: req.body.name})
      .exec(function(err, data){
        if (data){
          data.remove(function(err){
            if (err){
              res.json({status: false, message:'delete failed!!!'});
            }else{
              res.json({status: true, message:'delete succeed!!!'});
            }
          })
        }else{
          res.json({status: false, message:'delete failed!!!'});
        }
      })
  },

  edit: function(req,res){
    if(req.body){
      Game.findOne({name: req.body.name}).exec(function(err, data){
        if (data){
          data.name = req.body.name;
          data.gameurl = req.body.gameurl;
          data.background = req.body.background;
          data.logo = req.body.logo;
          data.description = req.body.description
        } else{
          return res.json({status: false, message: 'Game is not found!'});
        }
        //validate
        var err;
        function isEmpty(str){
          return str == '' || !str;
        }
        var keys = ['name', 'gameurl', 'background', 'logo', 'description'];
        keys.forEach(function(e){
          if (isEmpty(data[e])) {
            err = {status: false, message: 'Somthing is empty'};
            return;
          }
        });
        if (err)  return res.json(err);


        data.save(function(err, newData){
          if (err){
            res.json({status: false, message: 'Update failed!!!'});
          }
          else{
            res.json({status: true, message: 'Update succeed!!!'});
          }
        });
      });
    }
    else {
      res.json({status: false, message: 'Update fail!!!'})
    }
  },

  addGame: function(req, res) {
    if (!req.body.name || req.body.name=='') return res.json({status: false, message: 'Name is require'})
    Game.findOne({name: req.body.name}).exec(function(err, data){
      if (data) {
        res.json({status: false, message: 'Game are already exist!'})
      } else {
        var newGame = {
          name: req.body.name,
          gameurl: req.body.gameurl,
          background: req.body.background,
          logo: req.body.logo,
          description: req.body.description
        }

        //validate
        var err;
        function isEmpty(str){
          return str == '' || !str;
        }
        var keys = ['name', 'gameurl', 'background', 'logo', 'description'];
        keys.forEach(function(e){
          if (isEmpty(newGame[e])) {
            err = {status: false, message: 'Somthing is empty'};
            return;
          }
        });
        if (err)  return res.json(err);
        Game.create(newGame, function(err, data){
          res.json({status: true, message: 'Success'});
        });
      }
    });
  },

  getAll : function(req, res){
    Game.find().exec(function(err, data){
      res.json({status: true, result: data});
    });
  }
}
