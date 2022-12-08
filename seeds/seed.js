const sequelize = require('../config/connection');
const { Question, User ,Puzzle} = require('../models');

const questionSeedData = require('./questionSeedData.json');
const userSeedData = require('./userSeedData.json');
const puzzleSeedData = require('./puzzleSeedData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  const questions = await Question.bulkCreate(questionSeedData);
  const users = await User.bulkCreate(userSeedData);
  const puzzles = await Puzzle.bulkCreate(puzzleSeedData);

  process.exit(0);
};

seedDatabase();