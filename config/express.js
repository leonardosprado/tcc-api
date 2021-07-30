require("dotenv-safe").config();
// var jwt = require('jsonwebtoken');
const express    = require('express');
var bodyParser = require('body-parser');
const config     = require('config');
const consign = require('consign');
var cors = require('cors')

// var multer = require('multer');
// var upload = multer();

// global.__basedir = __dirname;






module.exports = () => {

  const app = express();
  



  // Pasta para upload de Arquivo
  // console.log(":"+ __basedir+'/public');
  // app.use(express.static((null,__basedir + "/public")));
  app.use(express.static((null,__basedir + "/")));

  // app.use("public",express.static((__dirname + "/public")));


  // SETANDO VARIÁVEIS DA APLICAÇÃO
  app.set('port', process.env.PORT || config.get('server.port'));
  
  // MIDDLEWARES

  // for parsing application/json
  app.use(bodyParser.json());

  // for parsing application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: true }));

  // for parsing multipart/form-data
  // app.use(upload.any()); 
  // app.use(express.static('public'));

  app.use(cors())

  app.use((use,res,next)=>{
      res.setHeader('Access-Control-Allow-Origin','*');
      // res.setHeader()
      res.setHeader('Access-Control-Allow-Header','Origin, X-Requrested-With, Content-Type, Accept, Authorization');
      // res.setHeader("Content-Type", "application/json");
      // res.setHeader("Content-Type", "multipart/form-data");
      
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