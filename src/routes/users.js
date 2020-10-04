var express = require('express');
var router = express.Router();
const loginController = require('../controllers/loginController')
const registroController = require('../controllers/registroController')
const regMiddleware = require('../middleware/regMiddleware')
const logMiddleware = require('../middleware/logMiddleware')


const {check} = require('express-validator');


router.get('/login', loginController.index);

router.post('/login', logMiddleware, loginController.entrar);

router.get('/registro', registroController.index);

router.post('/registro', regMiddleware, registroController.crear);

module.exports = router;
