const jwt = require('jsonwebtoken');

// Middleware para verificar o token JWT
exports.verifyToken = (req, res, next) => {
  const authHeader = req.header('Authorization');
  console.log('Cabeçalho Authorization:', authHeader); // Log do cabeçalho Authorization

  if (!authHeader) {
    console.error('Acesso negado, token não fornecido');
    return res.status(401).json({ error: 'Acesso negado, token não fornecido' });
  }

  const token = authHeader.split(' ')[1];
  console.log('Token extraído:', token); // Log do token extraído

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Token verificado:', verified);  // Log do payload decodificado do token
    req.user = verified;  // Armazena os dados do usuário logado (incluindo o ID)
    next();
  } catch (error) {
    console.error('Erro ao verificar o token JWT:', error.message);
    res.status(400).json({ error: 'Token inválido' });
  }
};
