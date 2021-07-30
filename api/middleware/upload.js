const util = require("util");
const multer = require("multer");
var crypto = require('crypto')
const { uuid } = require("uuidv4");
// sftpStorage = require('multer-sftp;');

const maxSize = 3 * 1024 * 1024;




let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // cb(null, __basedir + "public/uploads");
    cb(null,"public/uploads");
  },
  filename: (req, file, cb) => {
    const fileName = `${uuid()}-${file.originalname}`;
    // console.log(fileName);
    return cb(null, fileName);
  },
});

// let storage = new FTPStorage({
//   ftp:{
//     host: 'grupoponto.com.br',
//     port: 21,
//     user: 'leonardo@grupoponto.com.br',
//     password: 'Prado@7024'
//   },
//   basepath: 'temp/upload',
//   destination: function (req, file, options, callback) {
//     file.stream.on('end', function () {
    
//       callback(null, path.join(options.basepath, file.originalname))
//     })
    
//   },
//   transformFile: function (req, file, callback) {
//     // transform the file before uploading it
//     //   file.stream is a ReadableStream of the file
//     //   callback(error, < ReadableStream | Buffer | String >)
//     callback(null, file.stream)
//   }
//   // filename: (req, file,options,cb) => {
//   //   const fileName = `${uuid()}-${file.originalname}`;
//   //   console.log(fileName);
//   //   // console.log(fileName);
//   //   return cb(null, fileName);
//   // },
  
  
// });



// let storage = sftpStorage({
//   sftp: {
//     host: 'grupoponto.com.br',
//     port: 21,
//     username: 'leonardo@grupoponto.com.br',
//     password: 'Prado@7024'
//   },
//   destination: (req, file, cb) => {
//     // cb(null, __basedir + "public/uploads");
//     cb(null,"public/uploads");
//   },
//   filename: (req, file, cb) => {
//     const fileName = `${uuid()}-${file.originalname}`;
//     // console.log(fileName);
//     return cb(null, fileName);
//   },
// });"express": "^4.17.1",

let uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
  
}).single("imagem");

// console.log(__basedir + '/uploads/');

let uploadFileMiddleware = util.promisify(uploadFile);
// console.log(uploadFileMiddleware);

module.exports = uploadFileMiddleware;