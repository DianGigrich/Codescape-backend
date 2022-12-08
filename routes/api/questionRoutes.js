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

module.exports = router;