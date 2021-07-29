

var jwt = require('../../../config/jwt').jwt;
var database = require('../../../config/database').pool;


module.exports = Atividade;

function Atividade(data,monitor_id,url_img,img_name) {
    this.monitor_id = monitor_id;
    this.data = data;
    this.url_img = url_img;
    this.img_name = img_name;
}

Atividade.prototype.verificaDados = function(){
    
    
    if(!this.data.sugestao_resposta || !this.data.nivel || !this.data.palavra || !this.monitor_id || !this.url_img || !this.img_name  ){
        return false;
    }
    return true;

}

Atividade.getAll = async function(){
    const conn = await database.getConnection();
    
    try {
        
        var result = await conn.query(`
            select * from atividade;
        `);
        var rows = JSON.parse(JSON.stringify(result[0]));
        if(rows.length<1){
            throw {message:"Nenhuma atividade encontrada!"}
        }
        // console.log(rows);
        const list = Array();
        if(rows){
            rows.map(async (item,i)=>{
                // var monitor = await new Atividade(item,1);
                // list.push(monitor.ListDadosMonitor());
            })
        }
        conn.release();
        return rows;
        
        
    } catch (error) {
        conn.release();
        return error;
    }
}


Atividade.atividadesNRealizadas = async function(){
    const conn = await database.getConnection();
    
    try {
        
        var result = await conn.query(`
            select * from atividade_programada where COALESCE(status,'') <> 1;
        `);
        var rows = JSON.parse(JSON.stringify(result[0]));
        if(rows.length<1){
            throw {message:"Nenhuma atividade encontrada!"}
        }
        // console.log(rows);
        const list = Array();
        if(rows){
            rows.map(async (item,i)=>{
                // var monitor = await new Atividade(item,1);
                // list.push(monitor.ListDadosMonitor());
            })
        }
        conn.release();
        return rows;
        
        
    } catch (error) {
        conn.release();
        return error;
    }
}

Atividade.atividadeRealizada = async function(){
    const conn = await database.getConnection();
    
    try {
        
        var result = await conn.query(`
            select * from atividade_programada where status=1;
        `);
        var rows = JSON.parse(JSON.stringify(result[0]));
        if(rows.length<1){
            throw {message:"Nenhuma atividade encontrada!"}
        }
        // console.log(rows);
        const list = Array();
        if(rows){
            rows.map(async (item,i)=>{
                // var monitor = await new Atividade(item,1);
                // list.push(monitor.ListDadosMonitor());
            })
        }
        conn.release();
        return rows;
        
        
    } catch (error) {
        conn.release();
        return error;
    }
}

Atividade.atividadeRealizadaSearch = async function(search){
    const conn = await database.getConnection();
    console.log(search)
    try {
        
        const sql = `
            select t1.* 
            from 
            atividade_programada t1
            INNER JOIN aprendiz t2 ON (t1.id_aprendiz = t2.id_aprendiz)  
            INNER JOIN usuario t3 ON (t2.id_usuario = t3.id_usuario)  
            where t2.apelido LIKE ? OR t3.nome LIKE ?;
        `;

        // select t1.* 
        // from 
        // atividade_programada t1
        // INNER JOIN aprendiz t2 ON (t1.id_aprendiz = t2.id_aprendiz)  
        // INNER JOIN usuario t3 ON (t2.id_usuario = t3.id_usuario)  
        // where t2.apelido LIKE '%Gustavinh%' AND t3.nome LIKE '%Gustavinh%'


        // select t1.* 
        // from 
        // atividade_programada t1
        // INNER JOIN aprendiz t2 ON (t1.id_aprendiz = t2.id_aprendiz)   
        // where t2.apelido LIKE '%Gus%'
        // UNION
        // select t1.* 
        // from 
        // atividade_programada t1
        // INNER JOIN aprendiz t2 ON (t1.id_aprendiz = t2.id_aprendiz)   
        // INNER JOIN usuario t3 ON (t2.id_usuario = t3.id_usuario) 
        // where  t3.nome LIKE '%Gus%'

        const values = [search,search];
        // var rows = JSON.parse(JSON.stringify(result[0]));
        // if(rows.length<1){
        //     throw {message:"Nenhuma atividade encontrada!"}
        // }
        var [rows] = await conn.query(sql,values);
        // const list = Array();
        // if(rows){
        //     rows.map(async (item,i)=>{
        //         // var monitor = await new Atividade(item,1);
        //         // list.push(monitor.ListDadosMonitor());
        //     })
        // }
        conn.release();
        return rows;
        
        
    } catch (error) {
        conn.release();
        return error;
    }
}

Atividade.atividadesRealizadasById = async function(id){
    const conn = await database.getConnection();
    try {
        const sql = "select * from atividade_programada where id_atividade_programada=?;";
        const values = [id];
        var [rows] = await conn.query(sql,values);
        conn.release();

        if(rows.length<1){
            throw {message:"Nenhuma atividade encontrada!"}
        }
        // console.log(rows);
        // const list = Array();
        // if(rows){
        //     rows.map(async (item,i)=>{
        //         // var monitor = await new Atividade(item,1);
        //         // list.push(monitor.ListDadosMonitor());
        //     })
        // }
        conn.release();
        return rows;
        
        
    } catch (error) {
        conn.release();
        return error;
    }
}
Atividade.atividadesRealizadasLength = async function(){
    const conn = await database.getConnection();
    
    try {
        
        var result = await conn.query(`
            select * from atividade_programada where status=1;
        `);
        var rows = JSON.parse(JSON.stringify(result[0]));
        if(rows.length<1){
            throw {message:"Nenhuma atividade encontrada!"}
        }
        // console.log(rows);
        const list = Array();
        if(rows){
            rows.map(async (item,i)=>{
            })
        }
        conn.release();
        return ({'length':rows.length});
        
        
    } catch (error) {
        conn.release();
        return error;
    }
}
Atividade.atividadesRealizadasGetUserId = async function(id){
    const conn = await database.getConnection();
    
    try {
        
        const sql = "select * from atividade_programada where status=1 and id_aprendiz=?;";
        const values = [id];
        var [rows] = await conn.query(sql,values);
        conn.release();
        // var rows = JSON.parse(JSON.stringify(result[0]));
        if(rows.length<1){
            throw {message:"Nenhuma atividade encontrada!"}
        }
        // console.log(rows);
        const list = Array();
        if(rows){
            rows.map(async (item,i)=>{
                // var monitor = await new Atividade(item,1);
                // list.push(monitor.ListDadosMonitor());
            })
        }
        conn.release();
        return rows;
        
        
    } catch (error) {
        conn.release();
        return error;
    }
}



Atividade.prototype.createAtividade = async function(){
    const conn = await database.getConnection();
    try {
        if(this.verificaDados()){
            let current_datetime = new Date()
            let formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate() + " " + current_datetime.getHours() + ":" + current_datetime.getMinutes() + ":" + current_datetime.getSeconds() 
            // var user_exist = await getById(this.monitor_id);
            console.log(this.url_img);
            console.log(this.url_img.replace(/\\/g,"/"));
            var result = await conn.query(`
            INSERT INTO atividade(questao,sugestao_resposta,nivel,palavra,img_name,url_img, id_monitor,data_criacao,data_alteracao)
             VALUES ('${this.data.questao}','${this.data.sugestao_resposta}','${this.data.nivel}','${this.data.palavra}','${this.img_name}','${this.url_img.replace(/\\/g,"/")}','${this.monitor_id}','${formatted_date}','${formatted_date}')
            `);
            conn.release();
            var rows = JSON.parse(JSON.stringify(result[0]));
            var insertId = rows.insertId;
            return( {
                message:`Atividade ${insertId} criada com sucesso!`,
                status:200
            });
        }
        else{
            throw ({
                message:"Faltando todas informações da Atividade!",
                status:500
            });
        }
        
    } catch (error) {
        return(error);
    }
    
    
}


Atividade.getById = async function(id){
    const conn = await database.getConnection();
    
    try {
        
        var result = await conn.query(`
            select * from atividade where id_atividade IN (${id});
        `);
        var rows = JSON.parse(JSON.stringify(result[0]));
        if(rows.length<1){
            throw {message:"Nenhuma atividade encontrada!"}
        }
        // console.log(rows);
        // const list = Array();
        // if(rows){
        //     rows.map(async (item,i)=>{
        //         var monitor = await new Atividade(item,1);
        //         list.push(monitor.ListDadosMonitor());
        //     })
        // }
        conn.release();
        return rows;
        
        
    } catch (error) {
        conn.release();
        return error;
    }
}

Atividade.prototype.alterAtividade = async function(id){

    
    try {
        let current_datetime = new Date()
        let formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate() + " " + current_datetime.getHours() + ":" + current_datetime.getMinutes() + ":" + current_datetime.getSeconds() 
        
        const conn = await database.getConnection();

        const sql = "UPDATE atividade SET data_alteracao=?, sugestao_resposta=?, nivel=?, palavra=?  WHERE id_atividade=?;";
        const values = [formatted_date,this.data.sugestao_resposta,this.data.nivel,this.data.palavra,id];
        var [rows] = await conn.query(sql,values);
        conn.release();
        return rows;
        
        
    } catch (error) {
        conn.release();
        return error;
    }
}


Atividade.prototype.alterImageAtividade = async function(id){

    console.log(this.url_img);
    try {
        let current_datetime = new Date()
        let formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate() + " " + current_datetime.getHours() + ":" + current_datetime.getMinutes() + ":" + current_datetime.getSeconds() 
        
        const conn = await database.getConnection();
        console.log(this.url_img);
        const sql = "UPDATE atividade SET data_alteracao=?, img_name=?, url_img=?  WHERE id_atividade=?;";
        const values = [formatted_date, this.img_name, this.url_img.replace(/\\/g,"/"), id];
        var [rows] = await conn.query(sql,values);
        conn.release();
        return rows;
        
    } catch (error) {
        return error;
    }
}


Atividade.elaboraAtividade = async function(monitor_id,data){

    try {
        let current_datetime = new Date()
        let formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate() + " " + current_datetime.getHours() + ":" + current_datetime.getMinutes() + ":" + current_datetime.getSeconds() 
        console.log(data);
        // const aprendiz = getByIdAprendiz(data.id_aprendiz);
       
        const conn = await database.getConnection();
        const sql = `INSERT INTO atividade_programada(data_criacao,data_alteracao,id_monitor,id_atividade,id_aprendiz) 
        VALUES (?,?,?,?,?);`;
        const values = [formatted_date,formatted_date,monitor_id,data.id_atividade,data.id_aprendiz];
        var [rows] = await conn.query(sql,values);
        conn.release();

        const response = {
            "response":rows,
            "message":`Atividade elaborada com identificação: ${rows.insertId}`
        }
        return response;

        // if(rows.affectedRows>=0){
        //     return rows;
        // }
        // else{
        //     throw("NENHUMA ALTERAÇÃO FEITA");
        // }
        
    } catch (error) {
        
        const erro = {
            "error":JSON.stringify(error),
        }
        return erro;
    }
}


Atividade.realizaAtividade = async function(id_realiza,data){

    try {
        let current_datetime = new Date()
        let formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate() + " " + current_datetime.getHours() + ":" + current_datetime.getMinutes() + ":" + current_datetime.getSeconds() 
        const conn = await database.getConnection();
        const sql = "UPDATE atividade_programada SET data_realizacao=? ,data_alteracao=?, tentativa=?, status=?, resposta=?, resultado=? WHERE id_atividade_programada=?;"
        const values = [formatted_date,formatted_date,JSON.stringify(data.tentativa),data.status,data.resposta,data.resultado,id_realiza];
        var [rows] = await conn.query(sql,values);
        conn.release();
        return rows;
        
    } catch (error) {
    
        return error;
    }
}

Atividade.tentativaAtividade = async function(id_realiza,data){

    try {
        let current_datetime = new Date()
        let formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate() + " " + current_datetime.getHours() + ":" + current_datetime.getMinutes() + ":" + current_datetime.getSeconds() 
        const conn = await database.getConnection();
        const sql = "UPDATE atividade_programada SET data_alteracao=?, tentativa=? WHERE id_atividade_programada=?;"
        const values = [formatted_date,JSON.stringify(data.tentativa),id_realiza];
        var [rows] = await conn.query(sql,values);
        conn.release();
        return rows;
        
    } catch (error) {
    
        return error;
    }
}

Atividade.verificaAtividadeProgramada = async function(id_aprendiz,data){

    try {
        // let current_datetime = new Date()
        // let formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate() + " " + current_datetime.getHours() + ":" + current_datetime.getMinutes() + ":" + current_datetime.getSeconds() 
        const conn = await database.getConnection();
        const sql = "select * from atividade_programada WHERE id_aprendiz=? AND (status IS NULL OR NOT(STATUS=1));"
        
        const values = [id_aprendiz];
        var [rows] = await conn.query(sql,values);
        conn.release();
        const response = [];
        await Promise.all(rows.map(async (item,i) => {
            // console.log(i)
            if(item.status==null){
                var atividade = await this.getById(item.id_atividade)
                response.push( atividade[0]);
            }
        }));
        console.log(response);
        var response2 = {
            'id_atividade_programada':rows[0].id_atividade_programada,
            'atividade':response[0]
           
        }
        return response2;
        
    } catch (error) {
    
        return error;
    }
}






