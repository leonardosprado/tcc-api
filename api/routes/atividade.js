module.exports = app => {
    const controller = require("../controllers/atividade")();
    var multer = require('multer');
    const upload = multer({ dest: `${__basedir}/uploads/` })
    
    // console.log(controller.createAtividade);
    
    app.route('/api/v1/createatividade').post(controller.createAtividade);
    
    app.route('/api/v1/atividades').get(controller.getAll);
    
    app.route('/api/v1/atividade/:id').get(controller.getById);
    
    app.route('/api/v1/alter_atividade/:id').put(controller.alterAtividade);
    
    app.route('/api/v1/elabora_atividade').post(controller.elaboraAtividade);
    
    app.route('/api/v1/realiza_atividade/:id').put(controller.realizaAtividade);
    
    app.route('/api/v1/verifica_atividade').get(controller.verificaAtividade);
    
    app.route('/api/v1/tentativa_atividade/:id').patch(controller.tentativaAtividade);
    
    app.route('/api/v1/atividades_n_realizadas').get(controller.atividadesNRealizadas);
    
    app.route('/api/v1/atividades_realizadas').get(controller.atividadesRealizadas);

    app.route('/api/v1/atividades_realizadas/:id').get(controller.atividadesRealizadasById);

    app.route('/api/v1/atividades_realizadas/length').get(controller.atividadesRealizadasLength);

    // Example: localhost:3000/api/v1/atividades_realizadas/aprendiz?id=1
    app.route('/api/v1/atividades_realizadas/aprendiz').get(controller.atividadesRealizadasGetUserId);
    
    app.route('/api/v1/atividades_realizadas/:atividade_id').get(controller.atividadesRealizadas);

    app.route('/api/v1/atividade_realizada/').get(controller.atividadesRealizadasSearch);


    
    // app.route('/api/v1/monitor/:id').get(controller.getById);
    
    // app.route('/api/v1/create_monitor').post(controller.Create_monitor);
    
    // app.route('/api/v1/create_aprendiz').post(controller.createAprendiz);

    // app.route('/api/v1/alter-monitor/:id').post(controller.createAprendiz);

    // app.route('/api/v1/alter-aprendiz/:id').post(controller.createAprendiz);
    
    // app.route('/api/v1/aprendiz/:id').get(controller.getById);
    
}