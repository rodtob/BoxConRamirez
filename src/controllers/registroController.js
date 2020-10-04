var express = require('express');
const fs = require('fs')
const path = require('path')
const bcrypt = require('bcrypt')
const {check, validationResult, body} = require('express-validator')



const usuariosFilePath = path.join(__dirname + '/../data/usuarios.json')
const usuarios = JSON.parse(fs.readFileSync(usuariosFilePath, 'utf-8'))


module.exports = {
    index: (req,res)=>{
        res.render('registro', { title: 'Registro'})
    },
    crear: (req,res)=>{
        let errors = (validationResult(req))
        if (errors.isEmpty()){
            let nuevoUsuario = req.body
            delete nuevoUsuario.repassword

            for (const property in nuevoUsuario) {
               nuevoUsuario[property] = nuevoUsuario[property].toLowerCase();
              }

            nuevoUsuario.password = bcrypt.hashSync(req.body.password, 12)
            let newDb = [...usuarios, nuevoUsuario]
            fs.writeFileSync(usuariosFilePath, JSON.stringify(newDb), null, 2)
            res.redirect('/')
        }else{
            res.render('registro', {errors: errors.errors})
        }
    }
}