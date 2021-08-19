'use strict'

const express = require('express')
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');

app.use(cors());

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String },
});

const BookModel = mongoose.model('books', bookSchema);



app.get('/books', async (req, res) => {
  try {
    let booksdb = await BookModel.find({});
    res.status(200).send(booksdb);
  }
  catch (err) {
    res.status(500).send('dbase error');
  }

})

// start the db
// terminal ipAddress = 127.0.0.1 port 27017
//connect to the db
mongoose.connect('mongodb://127.0.0.1:27017/books', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(async () => {
    console.log('Connected to the database');

    let newBook = new BookModel({
      title: "Chronicles of Ivo Shandor",
      author: "Egon Spengler"
    })
    await newBook.save();

    //listen to port

    app.listen(3001, () => {
      console.log('Server up on 3001');
    });
  });


