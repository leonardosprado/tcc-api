
module.exports = () => {
    const database = require("../../config/database").pool;
    require("dotenv-safe").config();
    var jwt = require('../../config/jwt').jwt;
    const controller = {};
  
    controller.login  = async (req, res) => {
        try {
            const conn = await database.getConnection();
            const rows = await conn.query("select id_monitor,password,email from usuario, monitor where usuario.id_usuario = monitor.id_usuario;");
            conn.release()
            const login = req.body.login;
            const password = req.body.password;
            if(!login || !password){
                throw "Login e Senha não informado"
            }
            var response = JSON.parse(JSON.stringify(rows[0]));
            console.log(response)
            var authentication;
            response.map((item)=>{
                
                var id = item.id_monitor;
                var login2 = item.email;
                var type = 1;
                if(item.email==login){
                    if(password == item.password){
                        var token = jwt.sign({id,login2,type}, process.env.SECRET, {
                            expiresIn: 6000 // expires in 5min
                        });
                        authentication ={auth: true, token: token};
                    }
                    
                }
               
            });
       
            if(authentication){
                res.status(200).send(authentication);
            }
            else{
                throw "Usuário incorreto !";
            }
    
        } catch (error) {
            res.status(500).send({message:error});
        }

    };



    controller.loginAprendiz  = async (req, res) => {
        try {
            const conn = await database.getConnection();
            const rows = await conn.query("select id_aprendiz,password,apelido from usuario, aprendiz where usuario.id_usuario = aprendiz.id_usuario;");
            conn.release()
            const login = req.body.login;
            const password = req.body.password;
            if(!login || !password){
                throw "Login e Senha não informado"
            }
            var response = JSON.parse(JSON.stringify(rows[0]));
            console.log(response)
            var authentication;
            response.map((item)=>{
                console.log(item.apelido); 
                var id = item.id_aprendiz;
                var login2 = item.apelido;
                var type = 2;
                if(item.apelido==login){
                    if(password == item.password){
                        var token = jwt.sign({id,login2,type}, process.env.SECRET, {
                            expiresIn: 6000 // expires in 5min
                        });
                        authentication ={auth: true, token: token};
                    }
                    else{
                        throw "Senha Incorreta!";
                    }
                    
                }
                else{
                    throw "Usuário Incorreto!";
                }
               
            });
       
            if(authentication){
                res.status(200).send(authentication);
            }
            else{
                throw "Usuário incorreto !";
            }
    
        } catch (error) {
            res.status(500).send({message:error});
        }

    };
  
    return controller;

}