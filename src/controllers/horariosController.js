var express = require('express');
const fs = require('fs')
const path = require('path')

const tablaFilePath = path.join(__dirname + '/../data/horarios.json')
const tablaHorarios = JSON.parse(fs.readFileSync(tablaFilePath, 'utf-8'))

// let lunes = tablaHorarios.find(element => element.dia == 'lunes')
// let martes = tablaHorarios.find(element => element.dia == 'martes')
// let miercoles = tablaHorarios.find(element => element.dia == 'miercoles')
// let jueves = tablaHorarios.find(element => element.dia == 'jueves')
// let viernes = tablaHorarios.find(element => element.dia == 'viernes')
// let sabado = tablaHorarios.find(element => element.dia == 'sábado')

// let semana = [lunes, martes, miercoles, jueves, viernes]

module.exports = {
    mostrar: (req,res)=>{
        res.render('tablaHorarios', { title: 'horarios', semana: tablaHorarios, usuario: req.session.elusuario})
    },
    mostrarad: (req,res)=>{
        res.render('admintablaHorarios', { title: 'horarios', semana: tablaHorarios })
    },

    anotarse: (req,res)=> {
        res.send('vine por post')
    },
    actualizar: (req,res)=>{

        function repetirTabla(dia){
            tablaHorarios[dia].premediodia.disponible = req.body[ dia + "_premediodia"];
            tablaHorarios[dia].mediodia.disponible = req.body[ dia + "_mediodia"];
            tablaHorarios[dia].primeratarde.disponible = req.body[ dia + "_primeratarde"];
            tablaHorarios[dia].segundatarde.disponible = req.body[ dia + "_segundatarde"];
        }
        
        repetirTabla('lunes')
        repetirTabla("martes")
        repetirTabla("miercoles")
        repetirTabla("jueves")
        repetirTabla("viernes")
     
        fs.writeFileSync(tablaFilePath, JSON.stringify(tablaHorarios), null, 2)
        res.redirect('/')
    }
}