// const config = require('.config.json');
const db = require('../../../config/dababaseSequelize');

const database = require("../../../config/database").pool;


module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    delete: _delete
};


async function authenticate() {

    try {
        const conn = await database.getConnection();
        const rows = await conn.query("select * from usuario, monitor where usuario.id = monitor.id_usuario;");
        res.status(200).send({message:rows});
        var response = (rows[0])
        const monitor  = require("../models/monitor")(response.id,response.nome,response.data_criacao,response.data_alteracao,response.date_nascimento,response.sexo,response.id_monitor,response.email,response.curso);
        return(monitor.response());
    } catch (error) {
        res.status(500).send({message:error});
    }
        
}
async function getAll() {
    try {
        const conn = await database.getConnection();
        const rows = await conn.query("select * from usuario, monitor where usuario.id = monitor.id_usuario;");
        var response = (rows)
        return(response);
;
    } catch (error) {
        res.status(500).send({message:error});
    }
}
async function getById() {
    return await db.User.findAll();
}
async function create() {
    return await db.User.findAll();
}
async function update() {
    return await db.User.findAll();
}
async function _delete() {
    return await db.User.findAll();
}

