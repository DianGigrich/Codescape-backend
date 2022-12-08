const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Puzzle extends Model {}

Puzzle.init(
{
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
      }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'puzzle'
  }
);


module.exports = Puzzle;