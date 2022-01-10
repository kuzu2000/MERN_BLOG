const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require('./../models/User')
const Post = require('./../models/Post')
const mongoose = require('mongoose');
const auth = require('./../middleware/auth')

  
  //GET USER
  router.get("/:id", async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      const { password, ...others } = user._doc;
      res.status(200).json(others);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get("/", async (req, res) => {
    try {
      const users = await User.find()
      const {password, ...others} = users._doc
      res.status(200).json(others)
    } catch (err) {
      res.status(500).json(err)
    }
  })
  
  module.exports = router;