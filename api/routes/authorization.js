module.exports = app => {
    const controller = require("../controllers/authorization")();

    app.route('/api/v1/authorization')
        .post(controller.authorization);
    
}