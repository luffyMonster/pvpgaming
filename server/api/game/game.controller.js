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
      Game.findById(req.body.gameId)
      .populate('rates.user')
      .lean()
      .exec(function(err, game){
        if (err) return console.log(err);
        if (game){
          var ratedIndex, rate, userId = null;
          try {
            userId = ObjectIdCast(req.body.userId);
          } catch (e) {

          }
          game.rates.forEach(function(e, i){
            if (e.user._id + '' == userId + '' || e.user + '' == userId + ''){
              ratedIndex = i;
            }
          })
          if (ratedIndex) {
            rate = game.rates[ratedIndex];
            rate.value = parseInt(req.body.value);
          }
          else {
            rate = new Rate({
              user: userId,
              value: parseInt(req.body.value)
            });
            game.rates.push(rate);
          }
          // game.save(function(err, newData){
          //   if (err) console.log(err);
          //   rate.save();
          //   res.json({status: true, message: 'Success', data: newData})
          //   // newData.rates.forEach(function(e){
          //   //   console.log(e.user);
          //   // })
          // })
          Game.findByIdAndUpdate(req.body.gameId, game, function(err) {
            if(err) {
              res.json({ status: false, message: 'Update false!'});
            } else {
              res.json({ status: true, message: 'Updated!'});
            }
          })
          console.log(game);
        } else {
          console.log('Game not found');
        }
      })
  },
  getAll : function(req, res){
    var aggregateArray = [
      {
        $lookup: {
          from :'users',
          localField: 'rates.user',
          foreignField: '_id',
          as: 'rates.user'
        }
      },
      {
        $project: {
          _id: 1,
          name: 1,
          gameurl: 1,
          background: 1,
          logo: 1,
          description: 1,
          rates: 1
        }
      }
      // {
      //   $lookup: {
      //     from: 'User',
      //     localField: 'rates.user',
      //     foreignField: '_id',
      //     as: 'rates.user'
      //   }
      // }
    ];
    Game.aggregate(aggregateArray)
      .exec((err, docs = []) => {
        res.json(docs)
      })
    // Game.find().populate('rates.user').exec(function(err, data){
    //   res.json({status: true, result: data});
    // });
  }
}
