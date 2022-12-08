const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create our ques model
class Question extends Model {}

// create fields/columns for ques model
Question.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'question'
  }
);

module.exports = Question;