// models/tipoLeucemia.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const TipoLeucemia = sequelize.define('TipoLeucemia', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
});

module.exports = TipoLeucemia;
