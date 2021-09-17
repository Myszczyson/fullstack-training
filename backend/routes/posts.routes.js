const express = require('express');
const router = express.Router();

const Post = require('../models/post.model');

router.get('/posts', async (req, res) => {
  try {
    const result = await Post
      .find({status: 'published'})
      .select('author created title photo')
      .sort({created: -1});
    if(!result) res.status(404).json({ post: 'Not found' });
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.get('/:user/posts', async (req, res) => {
  try {
    const result = await Post
      .find({ author: req.params.user })
      .select('author created title photo')
      .sort({created: -1});
    if(!result) res.status(404).json({ post: 'Not found' });
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.post('/posts/add', async (req, res) => {
  try {

    const { author, created, updated, status, title , text, photo, price, phone, location } = req.body;

    if(title.length < 10 || text.length < 20) {
      throw new Error('Not enough characters in title or description');
    } else {

      const newPost = new Post({
        author: author,
        created: created,
        updated: updated,
        status: status,
        title: title,
        text: text,
        photo: photo ? photo : null,
        price: price ? price : null,
        phone: phone ? phone : null,
        location: location ? location : null,
      });

      await newPost.save();

      res.json(newPost);
      res.redirect('http://localhost:3000/');

    }
  }
  catch(err) {
    res.status(500).json(err);
  }
});


router.get('/posts/:id', async (req, res) => {
  try {
    const result = await Post
      .findById(req.params.id);
    if(!result) res.status(404).json({ post: 'Not found' });
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.put('/posts/:id/edit', async (req, res) => {
  try {
    const result = await Post.findById(req.params.id);
    const { author, created, status, title , text, photo, price, phone, location } = req.body;

    if(!result) {
      res.status(404).json({ post: 'Not found' });
    }  else {
      if(title.length < 10 || text.length < 20) {
        throw new Error('Not enough characters in title or description');
      } else {

        const editDate = new Date();

        result.author = author;
        result.created = created;
        result.updated = new Date(editDate.getFullYear(), editDate.getMonth(), editDate.getDate() ,editDate.getHours(), editDate.getMinutes(), editDate.getSeconds(), editDate.getMilliseconds());
        result.status = status;
        result.title = title;
        result.text = text;
        result.photo = photo;
        result.price = price;
        result.phone = phone;
        result.location = location;

        await result.save();

        res.json(result);
        res.redirect('http://localhost:3000/');
      }
    }
  }
  catch(err) {
    res.status(500).json(err);
  }
});

module.exports = router;
