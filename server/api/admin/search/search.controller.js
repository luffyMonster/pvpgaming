var User = require('../../user/user.model');

module.exports = {
  search:   function(req, res){
      User.find({
        name: new RegExp(req.query.name, 'i'),
        username: req.query.username,
        role: req.query.role
      })
      .exec(function(err, data){
        console.log(req.query);
        if (err) res.json(err);
        else res.json(data);
      });
  }
}
