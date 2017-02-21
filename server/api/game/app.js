var f = require('./FileUtils');

if (process.argv.length < 4) {
  console.log('Please pass 2 file name');
  process.exit(-1);
}
var fin = `./${process.argv[2]}`;
var fout = `./${process.argv[3]}`;
var map = new Map();
var exist = true;

f.readfile(fin, (lines)=>{
  //calcultor
  for (line of lines){
    if (line === '') break;
    var arr = line.split(' ');
    var oldvalue = map.get(arr[0]);
    var newvalue = parseInt(arr[1]);
    if (oldvalue !== undefined ) newvalue += oldvalue;
    map.set(arr[0], newvalue);
  }
  //filewriter
  for (let [key, value] of map.entries()){
    f.writefile(fout, `${key} ${value}\r\n`, (err) => {
          if (err) throw err;
    });
  }
});
console.log('Success!');
