const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  const authHeader = req.header('Authorization');

  if (!authHeader) {
    return res.status(401).json({ error: 'Acesso negado, token não fornecido' });
  }

  const token = authHeader.split(' ')[1]; // Remove o prefixo 'Bearer '

  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  try {
    // Verificar o token com a chave secreta
    const verified = jwt.verify(token, process.env.JWT_SECRET);  // Chave secreta do .env
    req.user = verified;  // Armazena o payload decodificado no req.user
    next();
  } catch (error) {
    res.status(400).json({ error: 'Token inválido' });
  }
};
