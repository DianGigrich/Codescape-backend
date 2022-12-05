const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Puzzle extends Model {}

Puzzle.init()

module.exports = Puzzle;