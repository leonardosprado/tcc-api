
var jwt = require('../../../config/jwt').jwt;
var database = require('../../../config/database').pool;

module.exports = Usuario;

function Usuario(data,role) {
    this.role = role;
    this.data = data;
}

module.exports.getById = async function(id){
    const conn = await database.getConnection();
    var User;
    try {
        // SELECT usuario.username, usuario.nome, usuario.sexo, usuario.telefone, usuario.data_nascimento,monitor.email,  monitor.curso 
        // FROM usuario,monitor
        // WHERE usuario.id_usuario = monitor.id_usuario;
        var result = await conn.query(`
            SELECT usuario.username, usuario.nome, usuario.sexo, usuario.telefone, usuario.data_nascimento,monitor.email, monitor.curso 
            FROM usuario,monitor WHERE usuario.id_usuario = monitor.id_usuario and monitor.id_monitor = ${id}
        `);
        var rows = JSON.parse(JSON.stringify(result[0]));
        if(rows.length<1){
            throw {message:"Usuãrio não encontrado"}
        }
        console.log(rows);
        User = new Usuario(rows,1);
        conn.release();
        return(User.ListDadosMonitor());
        
    } catch (error) {
        conn.release();
        return error;
    }

}

Usuario.prototype.ListDadosMonitor =  function(){
    try {
        if(!this.data){
            throw "Usuário não Existe";
        }
        // console.log(this.data);
        return this.data;
    } catch (error) {
        return error;
    }
}

Usuario.getAllMonitor = async function(){
    const conn = await database.getConnection();
    var User;
    try {
        
        var result = await conn.query(`
            SELECT usuario.username, usuario.nome, usuario.sexo, usuario.telefone, usuario.data_nascimento,monitor.email, monitor.curso 
            FROM usuario,monitor WHERE usuario.id_usuario = monitor.id_usuario
        `);
        var rows = JSON.parse(JSON.stringify(result[0]));
        if(rows.length<1){
            throw {message:"Usuãrio não encontrado"}
        }
        // console.log(rows);
        const listUsuario = Array();
        if(rows){
            rows.map(async (item,i)=>{
                var monitor = await new Usuario(item,1);
                listUsuario.push(monitor.ListDadosMonitor());
            })
        }
        conn.release();
        return listUsuario;
        
        
    } catch (error) {
        conn.release();
        return error;
    }
}


Usuario.getAllAprendiz = async function(){
    const conn = await database.getConnection();
    var User;
    try {
        
        var result = await conn.query(`
            SELECT usuario.username, usuario.nome, usuario.sexo, usuario.telefone, usuario.data_nascimento,aprendiz.apelido, aprendiz.apelido 
            FROM usuario,aprendiz WHERE usuario.id_usuario = aprendiz.id_usuario
        `);
        var rows = JSON.parse(JSON.stringify(result[0]));
        if(rows.length<1){
            throw {message:"Usuãrio não encontrado"}
        }
        // console.log(rows);
        const listUsuario = Array();
        if(rows){
            rows.map(async (item,i)=>{
                var monitor = await new Usuario(item,1);
                listUsuario.push(monitor.ListDadosMonitor());
            })
        }
        conn.release();
        return listUsuario;
        
        
    } catch (error) {
        conn.release();
        return error;
    }
}


Usuario.prototype.CreateUsuario = async function(){
    const conn = await database.getConnection();
    try {
        let current_datetime = new Date()
        let formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate() + " " + current_datetime.getHours() + ":" + current_datetime.getMinutes() + ":" + current_datetime.getSeconds() 
        var user = {
            username:this.data.username,
            nome:this.data.nome,
            sexo:this.data.sexo,
            telefone:this.data.telefone,
            data_criacao:  formatted_date,
            data_alteracao: formatted_date,
            data_nascimento: this.data.data_nascimento,
            password: this.data.password
        }
        var result = await conn.query(`
            INSERT INTO usuario (username,nome,sexo,telefone,data_criacao, data_alteracao,data_nascimento,password)
            VALUES ('${user.username}','${user.nome}','${user.sexo}','${user.telefone}','${user.data_criacao}','${user.data_alteracao}','${user.data_nascimento}','${user.password}')
        `);
        conn.release();
        var rows = JSON.parse(JSON.stringify(result[0]));
        var insertId = rows.insertId;
        
        if(this.role==1){
            if(insertId){
                var monitor = {
                    email:this.data.email,
                    curso:this.data.curso,
                }
                result = await conn.query(`
                INSERT INTO monitor (id_usuario,email,curso)
                VALUES ('${insertId}','${monitor.email}','${monitor.curso}')`);
                return( {
                    message:"Monitor Criado Com Sucesso",
                    status:200
                });
            }
        }
        if(this.role==2){
            if(insertId){
                var aprendiz = {
                    apelido:this.data.apelido,
                }
                result = await conn.query(`
                INSERT INTO aprendiz (id_usuario,apelido)
                VALUES ('${insertId}','${aprendiz.email}')
            `);
            return(
                {
                    message:"Aprendiz Criado Com Sucesso",
                    status:200
                }   
            );
        }
    }

    } catch (error) {
         conn.release();
         console.log(error);
        return (
            {
                message:error.message||error,
                status:400
            }    
        );
    }
    
    
    // console.log(this.role);
}

Usuario.prototype.addAtividade = async function(){
    
}

Usuario.prototype.Authorazation = function(token){
    console.log(token);
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
        if (err) return false;
        return({ID:decoded.id});
    });
    
}