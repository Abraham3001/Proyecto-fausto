// models/subtipoLeucemia.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');
const TipoLeucemia = require('./tipoLeucemia');

const SubtipoLeucemia = sequelize.define('SubtipoLeucemia', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

TipoLeucemia.hasMany(SubtipoLeucemia, { foreignKey: 'tipoId' });
SubtipoLeucemia.belongsTo(TipoLeucemia, { foreignKey: 'tipoId' });

module.exports = SubtipoLeucemia;
