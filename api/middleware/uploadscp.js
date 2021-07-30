// // with commonJS
// const { Client } = require('node-scp')

// // with ES Module
// import { Client } from 'node-scp'

// async function uploadFile() {
//   try {
//     const client = await Client({
//       host: 'grupoponto.com.br',
//       port: 21,
//       username: 'pontogrupo',
//       password: 'Grupo@solucoes!',
//       // privateKey: fs.readFileSync('./key.pem'),
//       // passphrase: 'your key passphrase',
//     })
//     await client.uploadDir('./local/dir', '/server/path')
//     client.close() // remember to close connection after you finish
//   } catch (e) {
//     console.log(e)
//   }
// }



// let uploadFileMiddleware = util.promisify(uploadFile);
// // console.log(uploadFileMiddleware);

// module.exports = uploadFileMiddleware;
