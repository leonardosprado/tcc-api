const util = require("util");
const multer = require("multer");
const sftpStorage = require('multer-sftp');
const { uuid } = require("uuidv4");
const maxSize = 3 * 1024 * 1024;

let Client = require('ssh2-sftp-client');
// let sftp = new Client();

// let storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     // cb(null, __basedir + "public/uploads");
//     cb(null,"public/uploads");
//   },
//   filename: (req, file, cb) => {
//     const fileName = `${uuid()}-${file.originalname}`;
//     // console.log(fileName);
//     return cb(null, fileName);
//   },
// });

let storage = sftpStorage({
  sftp: {
    host: 'grupoponto.com.br',
    port: 21,
    username: 'pontogrupo',
    password: 'Grupo@solucoes!'
  },
  destination: (req, file, cb) => {
    // cb(null, __basedir + "public/uploads");
    cb(null,__dirname+"public/uploads");
  },
  filename: (req, file, cb) => {
    const fileName = `${uuid()}-${file.originalname}`;
    // console.log(fileName);
    return cb(null, fileName);
  },
});

let uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).single("imagem");
// console.log(uploadFile);
// console.log(__basedir + '/uploads/');

let uploadFileMiddleware = util.promisify(uploadFile);
// console.log(uploadFileMiddleware);

module.exports = uploadFileMiddleware;