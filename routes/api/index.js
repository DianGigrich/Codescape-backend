const router = require('express').Router();
const questionRoutes = require('./questionRoutes');
const userRoutes = require('./userRoutes');
const puzzleRoutes = require('./puzzleRoutes');

router.use('/questions', questionRoutes);
router.use('/users', userRoutes);
router.use('/puzzles', puzzleRoutes);

module.exports = router;
