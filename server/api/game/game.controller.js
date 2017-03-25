'use strict';

var Game = require('./game.model');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//config Rate
var RateSchema = new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  value: Number
});
var Rate = mongoose.model('Rate', RateSchema)

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
  rateUpdate: function(req, res){
    console.log(req.body);
      Game.findById(req.body.gameId)
      .populate('rates.user')
      .exec(function(err, game){
        if (err) return console.log(err);
        if (game){
          var ratedIndex;
          game.rates.forEach(function(e, i){
            if (e.user._id == req.userId){
              ratedIndex = i;
              return;
            }
          })
          if (ratedIndex) game.rates[ratedIndex].value = parseInt(req.body.value);
          else {
            var rate = new Rate({
              user: req.body.userId,
              value: parseInt(req.body.value)
            });
            game.rates.push(rate);
          }
          game.save(function(err, newData){
            if (err) console.log(err);
            res.json({status: true, message: 'Success', data: newData})
            console.log(newData.rates[0].user);
          })
        } else {
          console.log('Game not found');
        }
      })
  },
  getAll : function(req, res){
    Game.find().populate('rates.user').exec(function(err, data){
      res.json({status: true, result: data});
    });
  }
}
