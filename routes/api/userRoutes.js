const router = require('express').Router();
const { User, Highscore } = require('../../models');
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

// GET all users
router.get("/", (req, res) => {
  User.findAll().then(userData => {
    res.json(userData)
  }).catch(err => {
    console.log(err);
    res.json({
      msg: "an error occurred",
      err,
    })
  })
})

// GET a user from token
router.get("/getuserfromtoken", (req, res) => {
  if (req.headers && req.headers.authorization) {
    var authorization = req.headers.authorization.split(' ')[1],
      decoded;
    try {
      decoded = jwt.verify(authorization, secret.secretToken);
    } catch (e) {
      return res.status(401).send('unauthorized');
    }
    var userId = decoded.id;
    // Fetch the user by id 
    User.findByPk(userId).then(function (user) {
      return res.send(200).json(user);
    });
  }
  return res.send(500);
})

// UPDATE a user
router.put('/:id', async (req, res) => {
  try {

    const userData = await User.findAll({
      include: [{ model: Highscore }]
    });
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});


// DELETE a user
router.delete('/:id', async (req, res) => {
  try {
    const userData = await User.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!userData) {
      res.status(404).json({ message: 'No user found with this id!' });
      return;
    }
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});


// GET a user from Id
router.get('/:id', async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id, {
      include: [{ model: Highscore }]
    });
    if (!userData) {
      res.status(404).json({ message: 'No user with this id!' });
      return;
    }
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});


// POST create a new user
router.post("/", (req, res) => {
  User.create(req.body).then(newUser => {
    const token = jwt.sign({
      id: newUser.id,
      username: newUser.username,
      email: newUser.email
    }, process.env.JWT_SECRET, {
      expiresIn: "2h"
    });
    return res.json({
      token,
      user: newUser
    });
  })
})

router.post("/login", (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then(foundUser => {
    if (!foundUser) {
      return res.status(401).json({ msg: "invalid login credentials" });
    } else if (!bcrypt.compareSync(req.body.password, foundUser.password)) {
      return res.status(401).json({ msg: "invalid login credentials" });
    } else {
      const token = jwt.sign({
        id: foundUser.id,
        email: foundUser.email
      }, process.env.JWT_SECRET, {
        expiresIn: "2h"
      });
      return res.json({
        token,
        user: foundUser
      });
    }
  })
})


module.exports = router;