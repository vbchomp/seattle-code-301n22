'use strict'

const express = require('express')
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const BookModel = require('./models/books.js');
app.use(cors());

//Moved books


app.get('/books', async (req, res) => {
  try {
    //C READ U D
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

    let books = await BookModel.find({});
    if (books.length === 0) {
      await addBook({
        title: "New Book",
        author: "Awesome Author"
      });

    }

    //listen to port

    app.listen(3001, () => {
      console.log('Server up on 3001');
    });
  });
async function addBook(obj) {
  //CREATE R U D
  //{title: "", author: ""}
  let newBook = new BookModel(obj);
  return await newBook.save();
}

async function clear() {
  try {
    await BookModel.deleteMany({});
    console.log('Bombed the DBase');

  }
  catch (err) {
    console.log('Error in clearing database');

  }
}
//*** USE ONLY AS A LAST RESORT!! Or you want to clearou out development data. :) ***//
//clear();