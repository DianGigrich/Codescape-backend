const router = require('express').Router();

const { User } = require('../../models');
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

// GET all users
router.get('/', async (req, res) => {
  try {
    const userData = await User.findAll();
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//one user by id
router.get('/:id', async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id);
    if(!userData) {
      res.status(404).json({message: 'No user found with this id.'});
      return;
    }
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE a user
router.put('/:id', async (req, res) => {
  try {
    const userData = await User.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!userData[0]) {
      res.status(404).json({ message: 'No user found with this id!' });
      return;
    }
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
    const userData = await User.findByPk(req.params.id);
    if (!userData) {
      res.status(404).json({ message: 'No user with this id!' });
      return;
    }
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a user from token
router.get("/getuser/getuserfromtoken",(req,res) => {
  try {
      const token = req.headers.authorization.split(" ")[1];
      const userData = jwt.verify(token, process.env.JWT_SECRET);
      res.json({user:userData})
  } catch (error) {
      res.status(500).json({user:false})
  }
})

// POST create a new user
router.post("/", (req,res) => {
  User.create(req.body).then(newUser => {
      const token = jwt.sign({
          id:newUser.id,
          username:newUser.username
      },process.env.JWT_SECRET,{
          expiresIn:"2h"
      })
      return res.json({
          token,
          user:newUser
      })
  })
})

router.post("/login",(req,res) => {
  User.findOne({
      where:{
        username:req.body.username
      }
  }).then(foundUser => {
      if (!foundUser) {
          return res.status(401).json({msg:"invalid login credentials"})
      } else if (!bcrypt.compareSync(req.body.password,foundUser.password)) {
          return res.status(401).json({msg:"invalid login credentials"})
      } else {
          const token = jwt.sign({
              id:foundUser.id,
              username:foundUser.username
          },process.env.JWT_SECRET,{
              expiresIn:"2h"
          })
          return res.json({
              token,
              user:foundUser
          })
      }
  })
})

module.exports = router;