const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');  // Importe o modelo de usuário

// Definindo o modelo de tarefas (Tasks)
const Task = sequelize.define('Task', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,  
  },
  userId: {  // Adiciona a chave estrangeira para o usuário
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,  // Modelo que estamos referenciando (User)
      key: 'id'     // Chave primária do modelo User
    }
  }
}, {
  tableName: 'tasks',  
  timestamps: true     
});

User.hasMany(Task, { foreignKey: 'userId' });

// Uma tarefa pertence a um único usuário
Task.belongsTo(User, { foreignKey: 'userId' });

module.exports = Task;
