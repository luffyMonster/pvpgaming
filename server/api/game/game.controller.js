'use strict';
var readdata = require('./readfile');
module.exports = {
  getAll : function(req, res){
    readdata('topgamedatas.json', (err, data)=>{
      if (err) throw err;
      console.log(JSON.parse(data));
      res.json(JSON.parse(data));
    });
  }
}
