const {check, validationResult, body} = require('express-validator')
const fs = require('fs')
const path = require('path')
const bcrypt = require('bcrypt')

const usuariosFilePath = path.join(__dirname + '/../data/usuarios.json')
const usuarios = JSON.parse(fs.readFileSync(usuariosFilePath, 'utf-8'))

module.exports = function(req,res,next){
    if(typeof req.session.elusuario != "undefined"){
        if(req.session.elusuario.usuario =='administrador'){
            next()
        } else{
          res.redirect('/')
        }
    } 
    res.redirect('/')
    next()
}