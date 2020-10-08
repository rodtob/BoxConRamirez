var express = require('express');
var router = express.Router();
const horariosController = require('../controllers/horariosController')
const seradminMiddleware = require('../middleware/seradminMiddleware');


router.get('/', horariosController.mostrar)

router.post('/', horariosController.anotarse)

router.get('/admin', seradminMiddleware, horariosController.mostrarad);

router.put('/admin', horariosController.actualizar)
  
module.exports = router;