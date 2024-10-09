const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Highscore extends Model {}

Highscore.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      value: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'id',
        },
      }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'highscore'
  }
);

module.exports = Highscore;