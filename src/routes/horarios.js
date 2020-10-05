var express = require('express');
var router = express.Router();
const horariosController = require('../controllers/horariosController')
const logueadoMiddleware = require('../middleware/logueadoMiddleware')


router.get('/', horariosController.mostrar)

router.post('/', logueadoMiddleware, horariosController.anotarse)

router.get('/admin', horariosController.mostrarad);

router.put('/admin', horariosController.actualizar)
  
module.exports = router;