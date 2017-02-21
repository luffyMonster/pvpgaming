var fs = require('fs');
module.exports = {
  //callback(data)
  readfile:  (file, callback) =>{
     if (!(fs.existsSync(file))) {
       console.log('File not exist ' + fs.existsSync(file));
       return;
     }
     fs.readFile(file, (err, data) =>{
       if (err) console.log(err);
       else{
         
       }
     });
   }
}
