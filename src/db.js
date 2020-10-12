var mysql = require('mysql2');
var connection = mysql.createConnection({
    host: "eu-cdbr-west-03.cleardb.net",
    user: "bb5712fe9d5c1d",
    password: "f0ed2623",
    database: "heroku_bca45002f329ce4",
});

connection.connect((err)=>{
    if(err){
      throw err;
    }
    console.log('Mysql connected')
  })

module.exports = connection;