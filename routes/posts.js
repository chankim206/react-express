const express = require("express");
const Post = require("../models/Post");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/", async (req, res) => {
  const post = new Post({
    title: req.body.title,
    description: req.body.description
  });
  try {
    const savePost = await post.save();
    res.json(savePost);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/:postId", async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (post) {
      res.json(post);
    } else {
      res.json({ message: "none was found" });
    }
  } catch (err) {
    res.json({ message: err });
  }
});

router.delete("/:postId", async (req, res) => {
  try {
    const post = await Post.deleteOne({ _id: req.params.postId });
    res.json(post);
  } catch (err) {
    res.json({ message: err });
  }
});

router.patch("/:postId", async (req, res) => {
  try {
    const updatePost = await Post.updateOne(
      { _id: req.params.postId },
      { $set: { title: req.body.title } }
    );
    res.json(updatePost);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
