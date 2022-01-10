const router = require("express").Router();
const User = require('./../models/User')
const Post = require('./../models/Post')
const mongoose = require('mongoose');
const auth = require('./../middleware/auth')
//CREATE POST
router.post("/", auth, async (req, res) => {
  const post = req.body;
 
  const newPostMessage = new Post({ ...post})

  try {
      await newPostMessage.save();

      res.status(201).json(newPostMessage );
  } catch (error) {
      res.status(409).json({ message: error.message });
  }
  });
  
  //UPDATE POST
  router.put("/:id", auth, async (req, res) => {
    const { id } = req.params;
    const { title, desc, photo, username, category } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { title, desc, photo, username, category, _id: id };

    await Post.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
  });
  
  //DELETE POST
  router.delete("/:id", auth, async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await Post.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully." });
  });
  
// SEARCH POST
  router.get('/search', async (req, res) => {
    const searchQuery = req.query.searchQuery;
    try {
      const title = new RegExp(searchQuery, 'i')
      const posts = await Post.find({title});
      res.status(200).json(posts)
    } catch (error) {    
      res.status(404).json({ message: error.message });
  }
  })

  //GET POST
  router.get("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const post = await Post.findById(id);
        
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
  });
  
  //GET ALL POSTS
  router.get("/", async (req, res) => {
    // const {page} = req.query;
    try {
      // const LIMIT = 3;
      // const startIndex = (Number(page) - 1) * LIMIT;
      // const postTotal = await Post.countDocuments({})
      const posts = await Post.find().sort({_id: -1})
      res.status(200).json(posts);
    } catch (err) {
      res.status(400).json(err)
    }
  });

  

  router.patch('/:id/like', auth, async (req, res) => {
    const { id } = req.params;

    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
      }

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
    const post = await Post.findById(id);

    const index = post.likes.findIndex((id) => id ===String(req.userId));

    if (index === -1) {
      post.likes.push(req.userId);
    } else {
      post.likes = post.likes.filter((id) => id !== String(req.userId));
    }
    const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true });
    res.status(200).json(updatedPost);
  })

  router.patch('/:id/view', auth, async (req, res) => {
    const {id} = req.params;
    if(!req.userId) return res.json({message: "Unauthenticated"});

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`)

    const post = await Post.findById(id);
    const index = post.views.findIndex((id) => id ===String(req.userId));

    if(index === -1) {
      post.views.push(req.userId);

    } else {
      post.views = post.views.filter((id, index) => post.views.indexOf(id) === index);
    }
    const updatedPost = await Post.findByIdAndUpdate(id, post, {new: true});
    res.status(200).json(updatedPost);
  })
  
  module.exports = router;