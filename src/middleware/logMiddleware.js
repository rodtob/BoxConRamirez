const {check, validationResult, body} = require('express-validator')
const fs = require('fs')
const path = require('path')
const bcrypt = require('bcrypt')

const usuariosFilePath = path.join(__dirname + '/../data/usuarios.json')
const usuarios = JSON.parse(fs.readFileSync(usuariosFilePath, 'utf-8'))


module.exports = [

    check("usuario", "usuario inexistente")
        .custom((value) => {
            let nombreUsuario = usuarios.find(element => element.usuario == value)
            if (nombreUsuario == undefined) {
                return false;
            } else {
                return true;
            }
        }),
    check("password", "password incorrecto")
        .custom((value) => {
        let buscaPass = usuarios.find(element =>  bcrypt.compareSync(value,element.password))
        if (buscaPass == undefined) {
            return false;
        } else {
            return true;
        }
    })

]