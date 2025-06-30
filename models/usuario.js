const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const Usuario = sequelize.define('Usuario', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: { isEmail: true }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true // Ya está correcto
  },
  googleId: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true
  },
  rol: {
    type: DataTypes.ENUM('profesor', 'estudiante'),
    allowNull: false
  }
});

module.exports = Usuario;
