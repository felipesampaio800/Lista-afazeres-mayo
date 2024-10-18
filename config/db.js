const { Sequelize } = require('sequelize');

// carrega as variáveis de ambiente do arquivo .env
require('dotenv').config();

// conexão com MySQL
const sequelize = new Sequelize(
  process.env.DB_NAME,     
  process.env.DB_USER,     
  process.env.DB_PASS,     
  {
    host: process.env.DB_HOST,   
    port: process.env.DB_PORT,   
    dialect: 'mysql',            
    logging: false               
  }
);

// teste conexão com o banco de dados
sequelize.authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados MySQL foi bem-sucedida.');
  })
  .catch(err => {
    console.error('Erro ao conectar ao banco de dados:', err);
  });

module.exports = sequelize;
