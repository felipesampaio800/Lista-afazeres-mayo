const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,     // Nome do banco de dados
  process.env.DB_USER,     // Usuário do banco de dados
  process.env.DB_PASS,     // Senha do banco de dados
  {
    host: process.env.DB_HOST,  // Host do banco de dados
    port: process.env.DB_PORT,  // Porta do banco de dados (5432 para PostgreSQL)
    dialect: 'postgres',        // Dialeto correto para PostgreSQL
    logging: false,             // Desativar logs de SQL (opcional)
  }
);

sequelize.authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados foi bem-sucedida.');
  })
  .catch(err => {
    console.error('Erro ao conectar ao banco de dados ou sincronizar tabelas:', err);
  });

module.exports = sequelize;
