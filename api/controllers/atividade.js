const FormData = require('form-data');
const { jwt, verification } = require('../../config/jwt');
const uploadFile = require('../middleware/upload');

const Atividade = require("../models/atividade/atividade.model");

var multer = require('multer');
const { deleteAtividade } = require('../models/atividade/atividade.model');
var upload = multer();

module.exports = () => {
    const controller = {};

    controller.getAll  = async (req, res) => {
      try {
          var token = req.headers['x-access-token'];
          var  verfy =  verification(token);
          if(!verfy.auth){
              throw verfy;
          }
          var response  = await Atividade.getAll();
          res.status(200).send(response);

      } catch (error) {
          console.log(error);
          res.status(500).send({error});
      }

  };
 
    
    controller.createAtividade  = async (req, res) => {
        try {
            var token = req.headers['x-access-token'];
            const verify = await verification(token);
            if(verify.auth==false){
                throw verify;
            }
            if(verify.message.type == 1){
                await uploadFile(req, res);
                var monitor_id = verify.message.id;
                var url_img = req.file.path;
                var img_name = req.file.fieldname;
                var data = req.body;
                if (req.file == undefined) {
                  return res.status(400).send({ message: "Por favor carrega a iamgem!" });
                }
                var Object_Atividade = new Atividade(data,monitor_id,url_img,img_name);
                var response = await Object_Atividade.createAtividade();
                return  res.status(200).send(response);
            }
            else{
              throw {message:"Sem permissão!"}
            }

          } catch (err) {
             res.status(500).send(err);
          }


    }

    controller.getById = async(req, res) => {
        try {
            var id = req.params.id;
            var token = req.headers['x-access-token'];
            const verify = await verification(token);
            if(verify.auth==false){
                throw verify;
            }
            if(verify.message.type == 1){
                var response  = await Atividade.getById(id);
                res.status(200).send(response);
            }
            else{
            throw {message:"Sem permissão!"}
            }
            
        } catch (err) {
            res.status(500).send(err);
        }
    }

    controller.alterAtividade = async(req, res) => {
        try {
            var id = req.params.id;
            var token = req.headers['x-access-token'];
            const verify = await verification(token);
            if(verify.auth==false){
                throw verify;
            }
            if(verify.message.type == 1){
                var atividade = new Atividade(req.body);
                var response  = await atividade.alterAtividade(id);
                res.status(200).send(response);
            }
            else{
                throw {message:"Sem permissão!"}
            }
            
        } catch (err) {
            res.status(500).send(err);
        }
    }

    controller.deleteAtividade = async(req, res) => {
        try {
            var id = req.params.id;

            var token = req.headers['x-access-token'];
            const verify = await verification(token);
            if(verify.auth==false){
                throw verify;
            }
            if(verify.message.type == 1){
                var response  = await Atividade.deleteAtividade(id);
                res.status(200).send(response);
            }
            else{
                throw {message:"Sem permissão!"}
            }
            
        } catch (err) {
            res.status(500).send(err);
        }
    }
    controller.alterImageAtividade = async(req, res) => {
        try {
            var id = req.params.id;
            var token = req.headers['x-access-token'];
            const verify = await verification(token);
            if(verify.auth==false){
                throw verify;
            }
            if(verify.message.type == 1){
                await uploadFile(req, res);
                var monitor_id = verify.message.id;
                var data = req.body;
                var url_img = req.file.path;
                var img_name = req.file.fieldname;
                if (req.file == undefined) {
                    return res.status(400).send({ message: "POR FAVOR CARREGUE A IMAGEM" });
                }
                var atividade = new Atividade(data,monitor_id,url_img,img_name);
                var response  = await atividade.alterImageAtividade(id);
                console.log(response)
                res.status(200).send(response);
            }
            else{
                throw {message:"Sem permissão!"}
            }
            
        } catch (err) {
            res.status(500).send(err);
        }
    }


    controller.elaboraAtividade = async(req, res) => {
        try {
            var token = req.headers['x-access-token'];
            const verify = await verification(token);
            if(verify.auth==false){
                throw verify;
            }
            if(verify.message.type == 1){
                var monitor_id = verify.message.id;
                var data = req.body;
                // var atividade = new Atividade(data,monitor_id,url_img,img_name);
                var response  = await Atividade.elaboraAtividade(monitor_id,data);
                res.status(200).send(response);
            }
            else{
                throw {message:"Sem permissão!"}
            }
            
        } catch (err) {
            res.status(500).send(err);
        }
    }

    
    controller.realizaAtividade = async(req, res) => {
        try {
            var id_realiza = req.params.id;
            var req_aprendiz_id = req.query.id_aprendiz;
            var token = req.headers['x-access-token'];
            const verify = await verification(token);
            console.log(verify);
            if(verify.auth==false){
                throw verify;
            }
            if(verify.message.type == 2){
                var aprendiz_id = verify.message.id;
                var data = req.body;
               
                    var response  = await Atividade.realizaAtividade(id_realiza,data);
                    res.status(200).send(response);
               
               
                // var atividade = new Atividade(data,monitor_id,url_img,img_name);
            }
            else{
                throw {message:"Sem permissão!"}
            }
            
        } catch (err) {
            res.status(500).send(err);
        }
    }

    controller.verificaAtividade = async(req, res) => {
        try {
            var id_realiza = req.params.id;
            var req_aprendiz_id = req.query.id_aprendiz;
            var token = req.headers['x-access-token'];
            const verify = await verification(token);
            
            console.log(verify);
            if(verify.auth==false){
                throw {status:401,verify};
            }
            if(verify.message.type == 2){
                var aprendiz_id = verify.message.id;
                var data = req.body;
                var response  = await Atividade.verificaAtividadeProgramada(aprendiz_id,data);
                // await console.log(response);
                res.status(200).send(response);
               
               
                // var atividade = new Atividade(data,monitor_id,url_img,img_name);
            }
            else{
                throw {status:401 ,message:"Sem permissão!"}
            }
            
        } catch (err) {
            res.status(err.status||500).send(err);
        }
    }

    controller.tentativaAtividade = async(req, res) => {
        try {
            var id_realiza = req.params.id;
            var req_aprendiz_id = req.query.id_aprendiz;
            var token = req.headers['x-access-token'];
            const verify = await verification(token);
            console.log(verify);
            if(verify.auth==false){
                throw verify;
            }
            if(verify.message.type == 2){
                var aprendiz_id = verify.message.id;
                var data = req.body;
               
                    var response  = await Atividade.tentativaAtividade(id_realiza,data);
                    res.status(200).send(response);
               
               
                // var atividade = new Atividade(data,monitor_id,url_img,img_name);
            }
            else{
                throw {message:"Sem permissão!"}
            }
            
        } catch (err) {
            res.status(500).send(err);
        }
    }

    controller.atividadesNRealizadas = async(req, res) => {
        try {
            var user_id = req.params.user_id;
            var req_aprendiz_id = req.query.id;
            var token = req.headers['x-access-token'];
            const verify = await verification(token);
            console.log(verify);
            if(verify.auth==false){
                throw verify;
            }
            if(verify.message.type == 1){
                var aprendiz_id = verify.message.id;
                var data = req.body;
               
                    var response  = await Atividade.atividadesNRealizadas();
                    res.status(200).send(response);
               
               
                // var atividade = new Atividade(data,monitor_id,url_img,img_name);
            }
            else{
                throw({message:"Sem permissão!"})
            }
            
        } catch (err) {
            res.status(500).send(err);
        }
    }

    controller.atividadesRealizadas = async(req, res) => {
        try {
            var id_realiza = req.params.id;
            
            var token = req.headers['x-access-token'];
            const verify = await verification(token);
            console.log(verify);
            if(verify.auth==false){
                throw verify;
            }
            if(verify.message.type == 2||verify.message.type == 1){
    
                var response  = await Atividade.atividadeRealizada();
                res.status(200).send(response);
               
            }
            else{
                throw {message:"Sem permissão!"}
            }
            
        } catch (err) {
            res.status(500).send(err);
        }
    }
    controller.atividadesRealizadasSearch = async(req, res) => {
        try {
            var id_realiza = req.params.id;
            var s = `%${req.query.s}%`;
            var parameter = req.query.parameter;
            var token = req.headers['x-access-token'];
            const verify = await verification(token);
            console.log(verify);
            if(verify.auth==false){
                throw verify;
            }
            if(verify.message.type == 2||verify.message.type == 1){
                var aprendiz_id = verify.message.id;
                var data = req.body;
               
                    var response  = await Atividade.atividadeRealizadaSearch(s);
                    res.status(200).send(response);
               
               
                // var atividade = new Atividade(data,monitor_id,url_img,img_name);
            }
            else{
                throw {message:"Sem permissão!"}
            }
            
        } catch (err) {
            res.status(500).send(err);
        }
    }
    controller.atividadesRealizadasById = async(req, res) => {
        try {
            var id_realiza = req.params.id;
            

            var token = req.headers['x-access-token'];
            const verify = await verification(token);
            console.log(verify);
            if(verify.auth==false){
                throw verify;
            }
            if(verify.message.type == 2||verify.message.type == 1){
                var aprendiz_id = verify.message.id;
                var data = req.body;
               
                    var response  = await Atividade.atividadesRealizadasById(id_realiza);
                    res.status(200).send(response);
               
               
                // var atividade = new Atividade(data,monitor_id,url_img,img_name);
            }
            else{
                throw {message:"Sem permissão!"}
            }
            
        } catch (err) {
            res.status(500).send(err);
        }
    }
    controller.atividadesRealizadasLength = async(req, res) => {
        try {
            var id_realiza = req.params.id;
            
            var token = req.headers['x-access-token'];
            const verify = await verification(token);
            console.log(verify);
            if(verify.auth==false){
                throw verify;
            }
            if(verify.message.type == 2||verify.message.type == 1){
                var aprendiz_id = verify.message.id;
                var data = req.body;
               
                    var response  = await Atividade.atividadesRealizadasLength();
                    res.status(200).send(response);
               
               
                // var atividade = new Atividade(data,monitor_id,url_img,img_name);
            }
            else{
                throw {message:"Sem permissão!"}
            }
            
        } catch (err) {
            res.status(500).send(err);
        }
    }
    controller.atividadesRealizadasGetUserId = async(req, res) => {
        try {
            var user_id = req.params.user_id;
            var req_aprendiz_id = req.query.id;
            var token = req.headers['x-access-token'];
            const verify = await verification(token);
            console.log(verify);
            if(verify.auth==false){
                throw verify;
            }
            if(verify.message.type == 2||verify.message.type == 1){
                var aprendiz_id = verify.message.id;
                var data = req.body;
               
                    var response  = await Atividade.atividadesRealizadasGetUserId(req_aprendiz_id);
                    res.status(200).send(response);
               
               
                // var atividade = new Atividade(data,monitor_id,url_img,img_name);
            }
            else{
                throw {message:"Sem permissão!"}
            }
            
        } catch (err) {
            res.status(500).send(err);
        }
    }
   

    return controller;
}