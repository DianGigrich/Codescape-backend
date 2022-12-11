const router = require('express').Router();
const { Highscore } = require('../../models');

// GET all highscores
router.get('/', async (req, res) => {
  try {
    const highscoreData = await Highscore.findAll();
    res.status(200).json(highscoreData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;