module.exports = app => {
    const controller = require("../controllers/user")();
    const verifyJWT = require('../controllers/authorization');
    // console.log(verifyJWT);
    app.route('/api/v1/usuarios').get(controller.user);
    app.route('/api/v1/alter_usuario/:id').post(controller.Alter_User);
    app.route('/api/v1/userdelete/:user_delete').delete(controller.DeleteAccountById);
    
    app.route('/api/v1/monitores').get(controller.getAllMonitores);
    app.route('/api/v1/monitor/:id').get(controller.getById);
    app.route('/api/v1/create_monitor').post(controller.Create_monitor);
    app.route('/api/v1/alter_monitor/:id').put(controller.Alter_monitor);
    
    
    app.route('/api/v1/aprendizes').get(controller.getAllAprendiz);
    app.route('/api/v1/aprendiz/:id').get(controller.getByIdAprendiz);
    app.route('/api/v1/create_aprendiz').post(controller.createAprendiz);
    app.route('/api/v1/alter_aprendiz/:id').put(controller.Alter_aprendiz);
    
    


    
    // app.route('/api/v1/aprendiz/:id').get(controller.getById);
    
}