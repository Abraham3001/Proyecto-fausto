const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');
const Cuestionario = require('./cuestionario');

const Pregunta = sequelize.define('Pregunta', {
  texto: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  respuesta: {
    type: DataTypes.TEXT,
    allowNull: false
  }
});

// Relación: una pregunta pertenece a un cuestionario
Pregunta.belongsTo(Cuestionario, { foreignKey: 'cuestionarioId' });
Cuestionario.hasMany(Pregunta, { foreignKey: 'cuestionarioId', as: 'preguntas' });

module.exports = Pregunta;
