// index.js

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const taskRoutes = require('./routes/taskRoutes');  
const sequelize = require('./config/db');          


app.use(bodyParser.json());

// teste de conexão 
sequelize.authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados foi bem-sucedida.');

    // sincroniza as tabelas pelo sequelize
    return sequelize.sync();
  })
  .then(() => {
    console.log('Tabelas sincronizadas com sucesso.');
  })
  .catch((err) => {
    console.error('Erro ao conectar ao banco de dados ou sincronizar tabelas:', err);
  });


app.use('/api', taskRoutes);

// servidro
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
