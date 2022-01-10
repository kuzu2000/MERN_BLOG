const router = require('express').Router();
const User = require('./../models/User')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const secret = 'test';
const auth = require('./../middleware/auth')
//REGISTER
router.post("/register", async (req, res) => {
  const { email, password, username } = req.body;

  try {
    const oldUser = await User.findOne({ email });

    if (oldUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({ email, password: hashedPassword, username});

    const token = jwt.sign( { username: result.username, email: result.email, id: result._id }, secret, { expiresIn: "1h" } );

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    
    console.log(error);
  }
  });
  
  //LOGIN
  router.post("/login", async (req, res) => {
    const { username, email, password } = req.body;

    try {
      const oldUser = await User.findOne({ email });
  
      if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });
  
      const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);
  
      if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });
  
      const token = jwt.sign({ username: oldUser.username, email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "1h" });
  
      res.status(200).json({ result: oldUser, token });
    } catch (err) {
      res.status(500).json({ message: "Something went wrong" });
    }
  });

  router.get("/", async (req, res) => {
    try {
      const users = await User.find()
      const {password, ...others} = users
      console.log(users)
      res.status(200).json(others)
    } catch (err) {
      res.status(500).json(err)
    }
  })

  //UPDATE
// router.put("/:id", auth, async (req, res) => {
//   const { id } = req.params;
//     const { username, email, profilePic, password } = req.body;
    
//     if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No user with id: ${id}`);

//     const updatedUser = { username, email, profilePic, password, _id: id };

//     await User.findByIdAndUpdate(id, updatedUser, { new: true });

//     res.json(updatedUser);
//   });
  
//   //DELETE
//   router.delete("/:id", auth, async (req, res) => {
//     const { id } = req.params;

//     if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No user with id: ${id}`);

//     await User.findByIdAndRemove(id);

//     res.json({ message: "User deleted successfully." });
//   });
  
  module.exports = router;