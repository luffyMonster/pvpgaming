'use strict';

var Game = require('./game.model');
var mongoose = require('mongoose');
var ObjectIdCast = mongoose.Types.ObjectId;
var Schema = mongoose.Schema;
//config Rate
var RateSchema = new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  value: Number
},{ _id: false });
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
      //res.body = {gameid, value, userId}
      Game.findById(req.body.gameId)
      .lean()
      .exec(function(err, game){
        if (err) return console.log(err);
        var updated;
        game.rates.forEach(function(e, i){
          if (e.userId == req.body.userId){
            game.rates[i].value  = req.body.value;
            updated = true;
          }
        });
        if (!updated){
          game.rates.push({userId: req.body.userId, value: req.body.value})
        }
        Game.findByIdAndUpdate(req.body.gameId, game, function(err) {
          if(err) {
            res.json({ status: false, message: 'Update false!'});
          } else {
            res.json({ status: true, message: 'Updated!'});
          }
        })
      })
  },
  getRatedAvg: function(req, res){
    //res.query = {gameid}
      Game.findById(req.query.gameId).exec(function(err, game){
        var sum = 0;
        game.rates.forEach(function(e){
          sum += e.value;
        })
        if (game.rates.length == 0 ) res.json({status: true, avg: 0})
        else res.json({status: true, gameId: game._id, avg: sum*1.0/game.rates.length})
      })
  },
  getUserRatedById: function(req, res){
    //res.query = {gameid, userId}
    Game.findById(req.query.gameId).exec(function(err, game){
      var stop = false;
      game.rates.forEach(function(e){
        if (req.query.userId == e.userId){
          res.json({status: true, message: 'Rated!', rate: e.value});
          stop = true;
          return
        }
      })
      if (!stop){
        res.json({status: false, message: 'Unrated!'})
      }
    })
  },
  getAll : function(req, res){
    Game.find().exec(function(err, data){
      res.json({status: true, result: data});
    });
  }
}
