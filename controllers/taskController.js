// controllers/taskController.js

const { validationResult } = require('express-validator');
const Task = require('../models/Task');

// Listar todas as tarefas
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar tarefas' });
  }
};

// Criar uma nova tarefa
exports.createTask = async (req, res) => {
  // Valida os dados de entrada
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title } = req.body;

  try {
    const task = await Task.create({ title });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar tarefa' });
  }
};

// Atualizar o status de uma tarefa
exports.updateTask = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const { status } = req.body;

  try {
    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ error: 'Tarefa não encontrada' });
    }

    task.status = status;
    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar tarefa' });
  }
};

// Deletar uma tarefa
exports.deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ error: 'Tarefa não encontrada' });
    }

    await task.destroy();
    res.json({ message: 'Tarefa deletada com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar tarefa' });
  }
};
