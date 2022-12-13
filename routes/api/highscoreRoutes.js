const router = require('express').Router();
const { Highscore, User } = require('../../models');

// GET all highscores
router.get('/', async (req, res) => {
  try {
    const highscoreData = await Highscore.findAll({
      include: [{  model: User }],
      limit: 10 ,
    order: 'follower DESC'
    });
    res.status(200).json(highscoreData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
      const highscore = await Highscore.create({
        value: req.body.value,
        user_id: req.body.user_id
    });
    res.status(200).json(highscore);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
      const highscore = await Highscore.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(highscore);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;