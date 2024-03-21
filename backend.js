const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 4000;

app.use(bodyParser.json());

app.post('/enviar-ficha-medica', (req, res) => {
  const fichaMedicaData = req.body;


  console.log('Dados da ficha médica recebidos:', fichaMedicaData);

  let jsonData = [];
  try {
    const rawData = fs.readFileSync('fichasMedicas.json', 'utf8');
    jsonData = JSON.parse(rawData);
  } catch (error) {
    console.error('Erro ao ler o arquivo', error);
  }

  jsonData.push(fichaMedicaData);

  try {
    fs.writeFileSync('fichasMedicas.json', JSON.stringify(jsonData, null, 2), 'utf8');
    console.log('Dados salvos com sucesso');
    res.status(200).send('Dados da ficha médica salvos com sucesso.');
  } catch (error) {
    console.error('Erro ao escrever o arquivo', error);
    res.status(500).send('Erro ao salvar a ficha médica.');
  }
});


app.listen(port, () => {
  console.log(`Servidor está ouvindo na porta ${port}`);
});
