const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Highscore extends Model {}

Highscore.init(
    {
    highscoreno: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
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