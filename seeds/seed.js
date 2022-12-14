const sequelize = require('../config/connection');
const { Question, User ,Puzzle, Highscore} = require('../models');

const questionSeedData = require('./questionSeedData.json');
const userSeedData = require('./userSeedData.json');
const puzzleSeedData = require('./puzzleSeedData.json');
//const highscoreSeedData = require('./highscoreSeedData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  const questions = await Question.bulkCreate(questionSeedData);
  const users = await User.bulkCreate(userSeedData, {
    individualHooks:true
  });
  const puzzles = await Puzzle.bulkCreate(puzzleSeedData);
  //const highscores = await Highscore.bulkCreate(highscoreSeedData);

  for (const { id } of users) {
    const newHighScore = await Highscore.create({
      user_id: id,
      value: 5
    });
  }

  process.exit(0);
};

seedDatabase();