const router = require('express').Router();
const { Question } = require('../../models');

// GET all questions
router.get('/', async (req, res) => {
  try {
    const questionData = await Question.findAll();
    res.status(200).json(questionData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a question
router.get('/:id', async (req, res) => {
  try {
    const questionData = await Question.findByPk(req.params.id);
    if (!questionData) {
      res.status(404).json({ message: 'No question with this id!' });
      return;
    }
    res.status(200).json(questionData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET all questions of a given level
router.get('/level/:level', async (req, res) => {
  try {
    const questionData = await Question.findAll({
      where: {
        level: req.params.level
      }
    });
    if (!questionData) {
      res.status(404).json({ message: 'No question with this level!' });
      return;
    }
    res.status(200).json(questionData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;