'use strict';

const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  email: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, uppercase: true, enum: ['LIFE-CHANGING', 'FAVORITE FIVE', 'RECCOMENDED TO ME'] },
});

const BookModel = mongoose.model('books', bookSchema);

module.exports = BookModel;

// original code
//const mongoose = require('mongoose');

// const bookSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   author: { type: String },
// });

// const BookModel = mongoose.model('books', bookSchema);

// module.exports = BookModel;
