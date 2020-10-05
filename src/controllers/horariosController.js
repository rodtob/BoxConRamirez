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
       
       if(typeof req.session.elusuario == "undefined"){
           res.render('login', {title: 'login'})
       } else{

        let horarioAchequear = tablaHorarios[req.body.dia][req.body.horario]
 
    
        if(horarioAchequear.disponible == 'ocupado'){
            switch(req.body.horario){
                case 'premediodia':
                    req.body.horario = '11hs';
                case 'mediodia':
                    req.body.horario = '12hs';
                case 'primeratarde':
                    req.body.horario = '13hs';
                case 'segundatarde':
                    req.body.horario = '14hs'
            }
            let diaElegido = {
                dia: req.body.dia,
                horario: req.body.horario
            }
            res.render('tablaHorarios',{title: 'horarios', semana:tablaHorarios,
             usuario: req.session.elusuario, ocupado: diaElegido})
            
        } else{

            tablaHorarios[req.body.dia][req.body.horario].alumnos.push(req.session.elusuario.usuario)
            console.log(tablaHorarios[req.body.dia][req.body.horario].alumnos.length)
            if (tablaHorarios[req.body.dia][req.body.horario].alumnos.length >= 3){
                tablaHorarios[req.body.dia][req.body.horario].disponible = 'ocupado'
            }
            fs.writeFileSync(tablaFilePath, JSON.stringify(tablaHorarios))
            req.session.elusuario.dia = req.body.dia
           
            switch(req.body.horario){
                case 'premediodia':
                    req.body.horario = '11hs';
                case 'mediodia':
                    req.body.horario = '12hs';
                case 'primeratarde':
                    req.body.horario = '13hs';
                case 'segundatarde':
                    req.body.horario = '14hs'
            }

            req.session.elusuario.horario = req.body.horario
        
            res.render('index',{title: 'Ramirez Box', usuario: req.session.elusuario})

        }

     } 
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