var monitor = (id,nome,data_criacao,data_alteracao,date_nascimento,sexo,id_monitor,email,curso) => {
    
    var data_transforme = {
        "id":id,
        "nome":nome,
        "data_criacao":data_criacao,
        "data_alteracao":data_alteracao,
        "date_nascimento":date_nascimento,
        "sexo":sexo,
        "id_monitor":id_monitor,
        "email":email,
        "curso":curso,
    }
    return {
        response:()=> data_transforme,
    }
}

module.exports = monitor;