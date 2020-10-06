var express = require('express');
const fs = require('fs')
const path = require('path')
const {check, validationResult, body} = require('express-validator');
// const session = require('express-session')

const usuariosFilePath = path.join(__dirname + '/../data/usuarios.json')
const usuarios = JSON.parse(fs.readFileSync(usuariosFilePath, 'utf-8'))

module.exports = {
    index: (req,res)=>{
        res.render('login', { title: 'Login'})
    },
    entrar: (req,res)=>{
        let errors = (validationResult(req))
        if (errors.isEmpty()){
            let usuarioFormulario = req.body.usuario.toLowerCase()
            let usuarioIngresado = usuarios.find(element => element.usuario == usuarioFormulario)
            req.session.elusuario ={
                      usuario : usuarioIngresado.usuario,
                      nombre: usuarioIngresado.nombre,
                      apellido: usuarioIngresado.apellido 
                      } 
            res.render('index',{title: 'Ramirez Box', usuario: req.session.elusuario})
        } else{
            res.render('login', {title: 'login', errors:errors.errors})
        }
    }
}