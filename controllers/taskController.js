const { validationResult } = require('express-validator');
const Task = require('../models/Task');

exports.getTasks = async (req, res) => {
  try {
    console.log('User ID autenticado:', req.user.id);  // Verifique se o ID do usuário logado está correto
    const tasks = await Task.findAll({
      where: { userId: req.user.id }
    });

    if (!tasks || tasks.length === 0) {
      return res.status(404).json({ error: 'Nenhuma tarefa encontrada para este usuário' });
    }

    res.json(tasks);  // Retorna a lista de tarefas como JSON
  } catch (error) {
    console.error('Erro ao buscar tarefas:', error);
    res.status(500).json({ error: 'Erro ao buscar tarefas' });
  }
};

// Criar uma nova tarefa associada ao usuário autenticado
exports.createTask = async (req, res) => {
  const { title } = req.body;

  try {
    const task = await Task.create({
      title,
      userId: req.user.id  // Associa a tarefa ao usuário logado
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar tarefa' });
  }
};

// Listar todas as tarefas do usuário autenticado
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      where: { userId: req.user.id }  // Busca as tarefas do usuário logado
    });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar tarefas' });
  }
};


// Atualizar o status de uma tarefa do usuário autenticado
exports.updateTask = async (req, res) => {
  // Valida os dados de entrada
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const { status } = req.body;

  try {
    // Verifica se a tarefa pertence ao usuário logado
    const task = await Task.findOne({ where: { id, userId: req.user.id } });
    if (!task) {
      return res.status(404).json({ error: 'Tarefa não encontrada ou não pertence a você' });
    }

    task.status = status;
    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar tarefa' });
  }
};

// Deletar uma tarefa do usuário autenticado
exports.deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    // Verifica se a tarefa pertence ao usuário logado
    const task = await Task.findOne({ where: { id, userId: req.user.id } });
    if (!task) {
      return res.status(404).json({ error: 'Tarefa não encontrada ou não pertence a você' });
    }

    await task.destroy();
    res.json({ message: 'Tarefa deletada com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar tarefa' });
  }
};
