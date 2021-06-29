const Usuario = require("../../models/user/user.model");

module.exports = () => {
    const database = require("../../../config/database").pool;
    const controller = {};
  
    controller.monitor  = async (req, res) => {
        try {
            const conn = await database.getConnection();
            console.log(conn);
            const rows = await conn.query("select * from usuario, monitor where usuario.id = monitor.id_usuario;");
            res.status(200).send({message:rows});
            var response = (rows[0])
            const monitor  = require("../models/monitor")(response.id,response.nome,response.data_criacao,response.data_alteracao,response.date_nascimento,response.sexo,response.id_monitor,response.email,response.curso);
             
            // var monitor = new Monitor(response.id,response.nome,response.data_criacao,response.data_alteracao,response.date_nascimento,response.sexo,response.id_monitor,response.email,response.curso);
            // console.log(monitor);
        } catch (error) {
            console.log(error);
            res.status(500).send({message:error});
        }
        

    };


    controller.Create_monitor  = async (req, res) => {
        try {
            const usuario = new Usuario;
            var token = req.headers['x-acess-token'];
            
            if(usuario.Authorazation(token)){
                const conn = await database.getConnection();
              
                const rows = await conn.query("select * from usuario, monitor where usuario.id = monitor.id_usuario;");
                res.status(200).send({message:rows});
                var response = (rows[0])
                // console.log(response);
                const monitor  = require("../models/monitor")(response.id,response.nome,response.data_criacao,response.data_alteracao,response.date_nascimento,response.sexo,response.id_monitor,response.email,response.curso);
                // console.log(usuario());
                 
                // var monitor = new Monitor(response.id,response.nome,response.data_criacao,response.data_alteracao,response.date_nascimento,response.sexo,response.id_monitor,response.email,response.curso);
                // console.log(monitor);
            }
            
        } catch (error) {
         
            res.status(500).send({message:error});
        }
        

    };

  
    return controller;

}
