module.exports = app => {
    const controller = require("../controllers/authentication")();

    app.route('/api/v1/loginmonitor')
        .post(controller.login);
    
        app.route('/api/v1/loginaprendiz')
        .post(controller.loginAprendiz);
    
}