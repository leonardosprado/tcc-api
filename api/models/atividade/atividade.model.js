var jwt = require('../../../config/jwt').jwt;
var database = require('../../../config/database').pool;


module.exports = Atividade;



function Atividade(data,monitor_id) {
    this.monitor = monitor;
    this.data = data;
    
}


Usuario.prototype.CreateAtividade = async function(){
    const conn = await database.getConnection();
    let current_datetime = new Date()
    let formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate() + " " + current_datetime.getHours() + ":" + current_datetime.getMinutes() + ":" + current_datetime.getSeconds() 

}
