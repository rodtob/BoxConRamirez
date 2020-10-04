const {check, validationResult, body} = require('express-validator')

module.exports = [
    check('nombre').isLength({min:1}).withMessage('Escribe tu nombre'),
    check('apellido').isLength({min:1}).withMessage('Escribe tu apellido'),    
    check('edad').isInt({min:10, max:75}).withMessage('Las clases son para mayores de 10 y menores de 75'),
    check('usuario','escribí tu usuario, mínimo 5 letras').isLength({min:5}),
    check("password", "password no coincide")
        .isLength({ min: 4 })
        .custom((value,{req}) => {
            if (value !== req.body.repassword) {
                return false
            } else {
                return value;
            }
        })

]