const router = require('express').Router();
const { Puzzle } = require('../../models');

// GET all puzzle
router.get('/', async (req, res) => {
  try {
    const puzzleData = await Puzzle.findAll();
    res.status(200).json(puzzleData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;