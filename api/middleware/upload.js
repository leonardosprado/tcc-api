const util = require("util");
const multer = require("multer");
const { uuid } = require("uuidv4");
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

let uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).single("imagem");
// console.log(uploadFile);
// console.log(__basedir + '/uploads/');

let uploadFileMiddleware = util.promisify(uploadFile);
// console.log(uploadFileMiddleware);

module.exports = uploadFileMiddleware;