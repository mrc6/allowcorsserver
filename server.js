const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { urlencoded } = require('body-parser');
const jsonToUrlEncoded = require("form-urlencoded");
const axios = require('axios');
const app = express();

const port = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('maxShop!!!'));

app.post('/', async (req, res) => {
    // recebe os dados passados
    const body = req.body;
    let response;

    // API
    // const apiToFetch = "https://ws.sandbox.pagseguro.uol.com.br/v2/checkout?email=marco_meireles@ig.com.br&token=AA91EBBCCCD547E9ABA425583D6B59BA"; //sandbox
    const apiToFetch = "https://ws.pagseguro.uol.com.br/v2/checkout?email=marco_meireles@ig.com.br&token=F25371AC24F6487084406B270E8DC4F2"; //produção

    // cria a string a ser passada
    const payload = jsonToUrlEncoded(body);
    
    // make request to IEX API and forward response
    await axios(apiToFetch, {
      method: 'post',
      data: payload
    })
    .then((res) => {
      //console.log(`statusCode: ${res.statusCode}`);
      //console.log(res.data);
      if(res){
        response = res.data;
      }
    })
    .catch((error) => {
      console.error(error);
    });
    
    // Mandando a resposta para fora
    res.send(response);
});
app.listen(port, () => console.log(`http://localhost:${port}`));
