const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
// require the blog model
require("../models/Blog");
// create a Blog model
const Blog = mongoose.model("blogs");

router.get("/", (req, res) => {
  Blog.find()
    .then(blogs => {
      console.log(blogs);
      res.json(blogs);
    })
    .catch(err => console.log(err));
  // res.send("get post route successfuly executed");
});

router.post("/", (req, res) => {
  console.log(req.body.title);
  // console.log(req.user.id);
  // save the data to db
  let newBlog = {
    title: req.body.title,
    description: req.body.description
  };

  new Blog(newBlog)
    .save()
    .then(blog => {
      console.log(blog);
      res.json(blog);
    })
    .catch(err => console.log(err));

  // res.send("post successfully posted to db");
});

router.put("/", (req, res) => {
  // find a blog by id
  Blog.findById({
    _id: req.body._id
  })
    .then(blog => {
      (blog.title = req.body.title), (blog.description = req.body.description);
      blog.save().then(blog => {
        res.json(blog);
      });
    })
    .catch(err => console.log(err));
});

// delete the blog
router.delete("/", (req, res) => {
  Blog.remove({
    _id: req.body._id
  })
    .then(() => {
      res.send("blog deleted successfully");
    })
    .catch(err => console.log(err));
});
module.exports = router;
