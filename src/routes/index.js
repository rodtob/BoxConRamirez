var express = require('express');
var router = express.Router();
var db = require('../db');
const mysql = require('mysql2')


/* GET home page. */

router.get('/', function(req, res) {
  if (req.session.elusuario == undefined){
    let usuario = ''
    res.render('index', { title: 'Box con Ramírez', usuario: usuario });
  } else{
    let usuario = req.session.elusuario
    res.render('index', { title: 'Box con Ramírez', usuario: usuario });
  }
});

router.get('/sumar', (req,res)=>{
  let post = {id: '6', nombre:'sarasa', fechaInicio: "2020-10-03" }
  let sql = 'INSERT INTO alumnos SET ?'
  let query = db.query(sql, post, (err, result)=>{
    if(err) throw err;
    console.log(result);
    res.send('post sumado')
  })
})

module.exports = router;
