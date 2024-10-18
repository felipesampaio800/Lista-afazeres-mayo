require('dotenv').config();  
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const taskRoutes = require('./routes/taskRoutes'); 
const authRoutes = require('./routes/authRoutes');  
const sequelize = require('./config/db');            
const { verifyToken } = require('./middlewares/authMiddleware');  


app.use(bodyParser.json());


app.use(express.static(path.join(__dirname, 'public')));

sequelize.authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados foi bem-sucedida.');
    return sequelize.sync();  // Sincronizar tabelas
  })
  .then(() => {
    console.log('Tabelas sincronizadas com sucesso.');
  })
  .catch((err) => {
    console.error('Erro ao conectar ao banco de dados ou sincronizar tabelas:', err);
  });

// Rotas de autenticação
app.use('/auth', authRoutes);

// Rotas de tarefas protegidas por autenticação
app.use('/api', verifyToken, taskRoutes);

app.get('/config', (req, res) => {
  res.json({ API_BASE_URL: process.env.API_BASE_URL });
});


// Servir a página HTML principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Inicializar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
