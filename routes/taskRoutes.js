// routes/taskRoutes.js

const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const taskController = require('../controllers/taskController');

// Definindo as rotas
router.get('/tasks', taskController.getTasks);

// Validações para criação de nova tarefa
router.post('/tasks', 
  [
    check('title').notEmpty().withMessage('O título da tarefa é obrigatório'),
    check('title').isLength({ min: 3 }).withMessage('O título deve ter no mínimo 3 caracteres')
  ],
  taskController.createTask
);

// Atualização de tarefas
router.put('/tasks/:id', 
  [
    check('status').isBoolean().withMessage('O status deve ser um valor booleano')
  ],
  taskController.updateTask
);

router.delete('/tasks/:id', taskController.deleteTask);

module.exports = router;
