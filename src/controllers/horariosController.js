var express = require('express');
const fs = require('fs')
const path = require('path')

const tablaFilePath = path.join(__dirname + '/../data/horarios.json')
const tablaHorarios = JSON.parse(fs.readFileSync(tablaFilePath, 'utf-8'))

const usuariosFilePath = path.join(__dirname + '/../data/usuarios.json')
const usuarios = JSON.parse(fs.readFileSync(usuariosFilePath, 'utf-8'))


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
        // let usuarioAsumarHora = usuarios.find(element => element.usuario == req.session.usuario)       
        let horarioAchequear = tablaHorarios[req.body.dia][req.body.horario]
        if(horarioAchequear.disponible == 'ocupado'){
            res.send('ya está ocupado')
            // res.render('tablaHorarios', {yaOcupado: 'ocupado'})
        } else{

            tablaHorarios[req.body.dia][req.body.horario].alumnos.push(req.session.elusuario.usuario)
            fs.writeFileSync(tablaFilePath, JSON.stringify(tablaHorarios))
            res.send('felicitaciones, te anotaste al horario de'+ req.body.dia + req.body.horario)
            // res.send(tablaHorarios)

        }

        // console.log(diaAchequear)
        // let horaAchequear = horarios.find(element => element.)
        // if()
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