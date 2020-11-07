const { response } = require('express');
const db = require('../../config/database');
const { jwt, verification } = require('../../config/jwt');
const Monitor = require('../models/monitor/monitor.service');
const Usuario = require('../models/User/user.model');

module.exports = () => {
    const database = require("../../config/database").pool;
    const controller = {};
  
    controller.user  = async (req, res) => {
        try {
            const conn = await database.getConnection();
            console.log(conn);
            const rows = await conn.query("select * from usuario, monitor where usuario.id = monitor.id_usuario;");
            res.status(200).send({message:rows});
            var response = (rows[0])
            // console.log(response);
            const monitor  = require("../models/monitor")(response.id,response.nome,response.data_criacao,response.data_alteracao,response.date_nascimento,response.sexo,response.id_monitor,response.email,response.curso);
            // console.log(usuario());
             
            console.log(monitor.response());
            // var monitor = new Monitor(response.id,response.nome,response.data_criacao,response.data_alteracao,response.date_nascimento,response.sexo,response.id_monitor,response.email,response.curso);
            // console.log(monitor);
        } catch (error) {
            console.log(error);
            res.status(500).send({message:error});
        }
        

    };

    controller.monitor  = async (req, res) => {
        //  console.log( await User.getAll());
        
         var monitores = await Monitor.getAll();

         try {
            await res.status(200).send(monitores);

         } catch (error) {
            res.status(500).send({message:error});
         }

    };

    controller.getAllAprendiz  = async (req, res) => {
        try {
            var token = req.headers['x-access-token'];
            var  verfy =  verification(token);
            if(!verfy.auth){
                throw verfy;
            }
            var response  = await Usuario.getAllAprendiz();
            res.status(200).send(response);

        } catch (error) {
            console.log(error);
            res.status(500).send({error});
        }

    };

    controller.getAllMonitores  = async (req, res) => {
        try {
            var token = req.headers['x-access-token'];
            var  verfy =  verification(token);
            if(!verfy.auth){
                throw verfy;
            }
            var response  = await Usuario.getAllMonitor();
            res.status(200).send(response);

        } catch (error) {
            res.status(500).send({error});
        }

    };
    

    controller.Create_monitor  = async (req, res) => {
        try {
            var token = req.headers['x-access-token'];
            var verify = jwt.verify(token,process.env.SECRET,function(err, decoded) {
                if (err)  {
                    return {auth:false,message:err}
                }
                return {auth:true,message:decoded}; 
            });
            if(!verify.auth){
                throw verify;
            }

            var User = new Usuario(req.body,1);
            var response  = await User.CreateUsuario();
            res.status(response.status).send({message:response.message});

        } catch (error) {
            // console.log(error);
            res.status(500).send({error});
        }
        

    };

    controller.createAprendiz = async(req,res) =>{
        try {
            var token = req.headers['x-access-token'];
            var verify = jwt.verify(token,process.env.SECRET,function(err, decoded) {
                if (err)  {
                    return {auth:false,message:err}
                }
                return {auth:true,message:decoded}; 
            });
            if(!verify.auth){
                throw verify;
            }

            var User = new Usuario(req.body,2);
            var response  = await User.CreateUsuario();
            res.status(response.status).send({message:response.message});

        } catch (error) {
            // console.log(error);
            res.status(500).send({error});
        }
    }

    

    controller.getById = async(req,res) =>{
        var id = req.params.id;
        try {
            var token = req.headers['x-access-token'];
            var verify = jwt.verify(token,process.env.SECRET,function(err, decoded) {
                if (err)  {
                    return {auth:false,message:err}
                }
                return {auth:true,message:decoded}; 
            });
            if(!verify.auth){
                throw verify;
            }
            var response = await Usuario.getById(id);

            res.status(200).send(response);

        } catch (error) {
            res.status(500).send({error});
        }
    }

    return controller;
}


// class Usuario {
//     constructor(id,nome,data_criacao,data_alteracao,date_nascimento,sexo){
//         this.id = id;
//         this.nome = nome;
//         this.data_criacao = data_criacao;
//         this.data_alteracao = data_alteracao;
//         this.date_nascimento = date_nascimento;
//         this.sexo = sexo;
//     }
// }

// class Monitor extends Usuario{

//     constructor(id,nome,data_criacao,data_alteracao,date_nascimento,sexo,id_monitor,email,curso){
//        super(id,nome,data_criacao,data_alteracao,date_nascimento,sexo);
//        this.id_monitor = id_monitor;
//        this.email = email;
//        this.curso = curso;
//     }
// }