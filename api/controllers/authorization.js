const { decode } = require('jsonwebtoken');

var jwt = require('../../config/jwt').jwt;

module.exports = () => {
    const database = require("../../config/database").pool;
    const controller = {};
  
    controller.authorization  = async (req, res) => {
        try {

            var token = req.headers['x-access-token'];
            // console.log(token);
            jwt.verify(token, process.env.SECRET, function(err, decoded) {
                if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
                
                // se tudo estiver ok, salva no request para uso posterior
               
                res.status(200).send({ID:decoded.id,login:decoded.login2,type:decoded.type});

          
            });
       
         
        } catch (error) {
            res.status(500).send({message:error});
        }

    };


    controller.verifyJWT = (req, res, next) => {
        var token = req.headers['x-access-token'];
        if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });
        
        jwt.verify(token, process.env.SECRET, function(err, decoded) {
            if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
        
            // se tudo estiver ok, salva no request para uso posterior
            req.userId = decoded.id;
             next();
        });
    };



    return controller;

}