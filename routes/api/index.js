const router = require('express').Router();
const questionRoutes = require('./questionRoutes');
const userRoutes = require('./userRoutes');
const puzzleRoutes = require('./puzzleRoutes');
const highscoreRoutes = require('./highscoreRoutes');

router.use('/questions', questionRoutes);
router.use('/users', userRoutes);
router.use('/puzzles', puzzleRoutes);
router.use('/highscores', highscoreRoutes);


module.exports = router;
