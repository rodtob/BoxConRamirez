var express = require('express');
var router = express.Router();

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

module.exports = router;
