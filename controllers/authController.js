// controllers/authController.js

const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// novo usuário
exports.register = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.create({ username, password });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao registrar usuário' });
  }
};

// login 
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Senha incorreta' });
    }

    const token = jwt.sign({ id: user.id }, 'seu_segredo_jwt', { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao realizar login' });
  }
};
