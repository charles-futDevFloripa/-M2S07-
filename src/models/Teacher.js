const { DataTypes } = require('sequelize');
const connection = require('../database/connection');

const Teacher = connection.define('teachers', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  specialty: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  hire_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

module.exports = Teacher;
