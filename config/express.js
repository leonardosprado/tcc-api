require("dotenv-safe").config();
// var jwt = require('jsonwebtoken');
const express    = require('express');
var bodyParser = require('body-parser');
const config     = require('config');
const consign = require('consign');
var cors = require('cors')






module.exports = () => {
  const app = express();


  // SETANDO VARIÁVEIS DA APLICAÇÃO
  app.set('port', process.env.PORT || config.get('server.port'));
  
  // MIDDLEWARES
  app.use(bodyParser.json());
  app.use(cors())

  app.use((use,res,next)=>{
      res.setHeader('Access-Control-Allow-Origin','*');
      // res.setHeader()
      res.setHeader('Access-Control-Allow-Header','Origin, X-Requrested-With, Content-Type, Accept, Authorization');

      if(res.method == 'OPTIONS'){
          res.setHeader('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
          return res.status(200).send({});

    }

    next();


  });

  consign({'cwd':'api'})
    .then('data')
    .then('controllers')
    .then('routes')
    .into(app);

  // require('../api/routes/customerWallets')(app);
  // require('../api/routes/user')(app);
  // require('../api/routes/authentication')(app);
  

  return app;
};