const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  author: { type: String, required: true },
  created: { type: Date, required: true },
  updated: { type: Date, required: true },
  status: { type: String, required: true },
  title: { type: String, minlength: 10, maxlength: 50, required: true },
  text: { type: String, minlength: 20, maxlength: 120, required: true },
  photo: { type: String },
  price: { type: Number, min: 0 },
  phone: { type: String },
  location: { type: String },
});

module.exports = mongoose.model('Post', postSchema);
