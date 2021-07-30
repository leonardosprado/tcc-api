// // with commonJS
// const { Client } = require('node-scp')

// with ES Module
import { Client } from 'node-scp'

async function uploadFile(req, file) {
  try {
    const client = await Client({
      host: 'grupoponto.com.br',
      port: 21,
      username: 'pontogrupo',
      password: 'Grupo@solucoes!',
      // privateKey: fs.readFileSync('./key.pem'),
      // passphrase: 'your key passphrase',
    })
    await client.uploadFile('./test.txt', '/workspace/test.txt')
    // you can perform upload multiple times
    await client.uploadFile('./test1.txt', '/workspace/test1.txt')
    client.close() // remember to close connection after you finish
  } catch (e) {
    console.log(e)
  }
}



let uploadFileMiddleware = util.promisify(uploadFile);
// console.log(uploadFileMiddleware);

module.exports = uploadFileMiddleware;
