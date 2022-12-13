const Question = require('./Question');
const User = require('./User');
const Puzzle = require('./Puzzle');
const Highscore = require('./Highscore');

User.hasOne(Highscore, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

Highscore.belongsTo(User, {
    foreignKey: 'user_id',
});

module.exports = { Question, User ,Puzzle, Highscore};
