
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
      
        var result = await conn.query(`
            SELECT monitor.id_usuario,usuario.username, usuario.nome, usuario.sexo, usuario.telefone, usuario.data_nascimento,monitor.email, monitor.curso 
            FROM usuario,monitor WHERE usuario.id_usuario = monitor.id_usuario and monitor.id_monitor = ${id}
        `);
        var rows = JSON.parse(JSON.stringify(result[0]));
        if(rows.length<1){
            throw {message:"Usuãrio não encontrado"}
        }
        // console.log(rows);
        User = new Usuario(rows,1);
        conn.release();
        return(User.ListDadosMonitor());
        
    } catch (error) {
        conn.release();
        return error;
    }

}

module.exports.getByIdAprendiz = async function(id){
    const conn = await database.getConnection();
    var User;
    try {
      
        const sql = `
            SELECT aprendiz.id_usuario, usuario.username, usuario.nome, usuario.sexo, usuario.telefone, usuario.data_nascimento,aprendiz.apelido 
            FROM usuario,aprendiz WHERE usuario.id_usuario = aprendiz.id_usuario and aprendiz.id_aprendiz = ?
        `;

        const values = [id];
        var [rows] = await conn.query(sql,values);
        conn.release();
        // var rows = JSON.parse(JSON.stringify(result[0]));
        if(rows.length<1){
            throw {message:"Usuãrio não encontrado"}
        }
        // console.log(rows);
        User = new Usuario(rows,1);
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
    try {
        
        var result = await conn.query(`
            SELECT monitor.id_usuario,monitor.id_monitor,usuario.username, usuario.nome, usuario.sexo, usuario.telefone, usuario.data_nascimento,monitor.email, monitor.curso 
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


Usuario.getAllAprendiz = async function(res){
    const conn = await database.getConnection();
    try {
        
        var result = await conn.query(`
            SELECT aprendiz.id_aprendiz,usuario.username, usuario.nome, usuario.sexo, usuario.telefone, usuario.data_nascimento,aprendiz.apelido, aprendiz.apelido
            FROM usuario,aprendiz WHERE usuario.id_usuario = aprendiz.id_usuario
        `);
        var rows = JSON.parse(JSON.stringify(result[0]));
        if(rows.length<1){
            res.status(500);
            throw new Error(res.json({error:"Usuários não encontrado"}))
        }
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
        Object.keys(user).map(item=>{
            // console.log(user[item]);
            if(user[item]==undefined || user[item]==null) throw(`${item} em branco`)
        })
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
                conn.release();
                return( {
                    message:"Monitor Criado Com Sucesso",
                    respose:result,
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
                VALUES ('${insertId}','${aprendiz.apelido}')
                `);
                conn.release();
            return(
                {
                    message:"Aprendiz Criado Com Sucesso",
                    respose:result,
                    status:200
                }   
            );
        }
    }

    } catch (error) {
        conn.release();
        return (
            {
                message:error.message||error,
                status:400
            }    
        );
    }
    
    
    // console.log(this.role);
}


Usuario.prototype.DeleteUser = async function(){

} 

Usuario.prototype.typeUserExist = async function(id_user){
    // Role 1 = Monitor
    // Role 2 = Aprendiz
    if(this.role==1){
        const conn = await database.getConnection();
        const sql = "SELECT id_monitor FROM monitor WHERE id_monitor = ?;";
        const values = [id_user];
        var [rows] = await conn.query(sql,values);
        conn.release();

        return rows.length>0?true:false;


    }
    if(this.role==2){
        const conn = await database.getConnection();
        const sql = "SELECT id_aprendiz FROM monitor WHERE id_aprendiz = ?;";
        const values = [id_user];
        var [rows] = await conn.query(sql,values);
        conn.release();
        return rows.length>0?true:false;
    }
    else{
        return false;
    }
   
}

Usuario.prototype.userExist = async function(id_user){
    console.log(id_user);
    const conn = await database.getConnection();
    const sql = "SELECT id_usuario FROM usuario WHERE id_usuario = ?;";
    const values = [id_user];
    var [rows] = await conn.query(sql,values);
    conn.release();
    return rows.length>0?true:false;
}


Usuario.prototype.AlterUsuario = async function(id_user){
    // const conn = await database.getConnection();

    try {
      const user_exist = await this.userExist(id_user);
      console.log(user_exist);
      if(user_exist){
        const conn = await database.getConnection();
        const sql = "UPDATE usuario SET nome=?, sexo=?, telefone=?, data_alteracao=?, data_nascimento=? WHERE id_usuario=?;";

        data_atual = new Date();

        const values = [this.data.nome, this.data.sexo, this.data.telefone, data_atual,this.data.data_nascimento,id_user];
        var [rows] = await conn.query(sql,values);
        conn.release();
        return (
            {
                message:rows,
                status:200
            }    
        );
      }
      else{
          throw "Usuário não existe";
      }
        
        
    } catch (error) {
      
        return (
            {
                message:error.message||error,
                status:400
            }    
        );
    }
}


Usuario.prototype.AlterMonitor = async function(id_user){
    // const conn = await database.getConnection();
  
    
    try {
      const user_exist = await this.userExist(id_user);
    //   console.log(user_exist)
      if(true){
        const conn = await database.getConnection();
        const sql = "UPDATE monitor SET email=?, curso=? WHERE id_monitor=?;";

        data_atual = new Date();

        const values = [this.data.email, this.data.curso, id_user];
        var [rows] = await conn.query(sql,values);
        conn.release();
        return (
            {
                message:rows,
                status:200
            }    
        );
      }
      else{
          throw "Usuário não existe";
      }
        
        
    } catch (error) {
      
        return (
            {
                message:error.message||error,
                status:400
            }    
        );
    }
}

Usuario.prototype.AlterAprendiz = async function(id_user){
    // const conn = await database.getConnection();
  
    
    try {
    //   const user_exist = await this.userExist(id_user);
    //   console.log(user_exist)
      if(true){
        const conn = await database.getConnection();
        const sql = "UPDATE aprendiz SET apelido=? WHERE id_aprendiz=?;";

        data_atual = new Date();

        const values = [this.data.apelido,id_user];
        var [rows] = await conn.query(sql,values);
        var responseMessage = ""
        if(rows.affectedRows>0){
            responseMessage="Salvo com sucesso!"
        }
        conn.release();
        return (
            {
                message:responseMessage,
                // status:200
            }    
        );
      }
      else{
          throw "Usuário não existe";
      }
        
        
    } catch (error) {
      
        // console.log(error);
        return (
            {
                message:error.message||error,
                // status:400
            }    
        );
    }
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