'use strict';
var readdata = require('./readfile');
module.exports = {
  getAll : function(req, res){
    readdata('topgamedatas.json', (err, data)=>{
      if (err) return console.log(err);
      res.json(JSON.parse(data));
    });
  }
}
