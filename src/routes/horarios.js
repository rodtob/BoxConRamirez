var express = require('express');
var router = express.Router();
const horariosController = require('../controllers/horariosController')

router.get('/', horariosController.mostrar)

router.post('/', horariosController.anotarse)

router.get('/admin', horariosController.mostrarad);

router.put('/admin', horariosController.actualizar)
  
module.exports = router;