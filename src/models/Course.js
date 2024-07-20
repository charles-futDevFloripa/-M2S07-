const { DataTypes } = require('sequelize');
const connection = require('../database/connection');

const Course = connection.define('courses', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Course;
