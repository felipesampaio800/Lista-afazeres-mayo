// models/Task.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

// Definindo o modelo de tarefas (Tasks)
const Task = sequelize.define('Task', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,  // Pendente por padrão
  }
}, {
  tableName: 'tasks',  // Nome da tabela no MySQL
  timestamps: true     // Adiciona createdAt e updatedAt automaticamente
});

module.exports = Task;
