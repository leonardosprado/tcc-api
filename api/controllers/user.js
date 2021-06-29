const { response } = require('express');
const db = require('../../config/database');
const { jwt, verification } = require('../../config/jwt');
const Monitor = require('../models/monitor/monitor.service');
const Usuario = require('../models/user/user.model');

module.exports = () => {
    const database = require("../../config/database").pool;
    const controller = {};
  
    controller.user  = async (req, res) => {
        try {
            const conn = await database.getConnection();
            // console.log(conn);
            const rows = await conn.query("select id_usuario, username, nome, sexo, telefone, data_nascimento,data_nascimento from usuario;");
            res.status(200).send({message:rows});
            var response = (rows[0])
            const monitor  = require("../models/monitor")(response.id,response.nome,response.data_criacao,response.data_alteracao,response.date_nascimento,response.sexo,response.id_monitor,response.email,response.curso);
            // console.log(monitor.response());
        } catch (error) {
            // console.log(error);
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
            var response  = await Usuario.getAllAprendiz(res);
            res.status(200).send(response);

        } catch (error) {
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

    controller.Alter_User = async (req, res) => {
        try {
            var id = req.params.id;
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
            var response  = await User.AlterUsuario(id);
            res.status(200).send(response);
        } catch (error) {
            res.status(500).send({error});
        }
    }

    controller.Alter_monitor = async (req, res) => {
        try {
            var id = req.params.id;
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
            var response  = await User.AlterMonitor(id);
            res.status(200).send(response);
        } catch (error) {
            res.status(500).send({error});
        }
    }

    controller.DeleteAccountById = async (req, res) => {
        try {
            var id = req.params.id;
            var userDelete = req.params.user_delete;
            var token = req.headers['x-access-token'];
           
            var verify = jwt.verify(token,process.env.SECRET,function(err, decoded) {
                if (err)  {
                    return {auth:false,message:err}
                }
                return {auth:true,message:decoded}; 
            });
            if(!verify.auth){
                throw verify;
            }else{
                const current_user = verify.message;
                if(current_user){
                    if(current_user.id == userDelete){
                        throw "NÃO PODE APAGAR O PROPRIO USUÁRIO";
                    }
                    // var response = await User.DeleteUser();
                }
                var response ={'message':'FUNÇÃO NÃO LIBERADA NESSA ATUALIZAÇÃO'};
                res.status(200).send(response);

            }
         
            // var User = new Usuario(req.body,1);
            // var response  = await User.AlterMonitor(id);
            
        } catch (error) {
            res.status(500).send({error});
        }
    }

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

    controller.Alter_aprendiz = async (req, res) => {
        try {
            var id = req.params.id;
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
            var response  = await User.AlterAprendiz(id);
            res.status(200).send(response);
        } catch (error) {
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

    controller.getByIdAprendiz = async(req,res) =>{
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
            var response = await Usuario.getByIdAprendiz(id);

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