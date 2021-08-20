# Mongo, Mongoose and Data Modeling

## Overview

Today is all about persistence. We will introduce Mongodb and Mongoose. We will create data models and hard code some data to store in our database so that our front end can retrieve that data. We will introduce `CRUD` and focus on the `R`:`READ`.

## Daily Plan

- Warm-up exercise
- Review code challenges
- Introduction of today's code challenge topic
- Code review of lab assignment
- Mongo, Mongoose, Data Modeling
- Code Demo
- Lab Preview

## Learning Objectives

As a result of completing lecture 13 of Code 301, students will:

- Describe and Define 
  - CRUD
  - MONGO
  - Mongoose
  - ORM
  - GET
- Be able to create a data model or schema
- Be able to set up a Mongo database using Mongoose
- Be able to retrieve all of the entries from a Mongo database using Mongoose

## Notes

1. What does the R stand for in CRUD? 



1. What is an ORM?



1. How are Mongo and Mongoose related?



1. Why do we need to use Mongoose at all? 



1. Where does Mongo live? 



1. Mongoose: 
  - step 1: Bring in Mongoose
  ```javaScript
  const mongoose = require('mongoose');
  // making a database called cats
  mongoose.connect('mongodb://localhost:27017/cats-database', {useNewUrlParser: true, useUnifiedTopology: true});

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    console.log('Mongoose is connected')
  });
  ```

- step 2: Make a schema
```javaScript
const catSchema = new mongoose.Schema({
  name: {type: String}
});

```
- step 3: Make a model from the schema
```javaScript
const CatModel = mongoose.model('cat-collection', catSchema);
```

- step 4: Create and save a record
```javaScript
const fluffy = new CatModel({name:'fluffy'});
fluffy.save();
```

- step 5: Gets all the records from the database
```javaScript
  CatModel.find((err, cat) => {
    if(err) return console.error(err);
    console.log({cat})
  });
```

- Gets the record where the name is 'fluffy'
```javaScript
  CatModel.find({name:'fluffy'}, (err, cat) => {
    if(err) return console.error(err);
    console.log({cat})
  });
```

1. What resources can I use to help me with my lab and to learn more?
[mongoose](https://mongoosejs.com/docs/)

## Additional MongoDB thoughts based on what we have encountered in class:

> Clarification regarding MongoDB and some differences between Mac and Windows MongoDB usage.  some definitions and important points:
- MongoDB is a Database Management System.  
running mongod  in your terminal allows you to interact with that management system.
- Windows Users, the way we’ve done things in class with JPs direction, you must path your db, and it appears that you need to have `mongod` running for that path to be accessible for your can-of-books-api.  
   - SIDE NOTE:  Windows users, be VERY thankful we have JP here...  I never would’ve figured that out in lecture, and had no idea it was a necessary step.  I have not successfully used Mongo on a Windows machine!
- Mac users, like many things Mac, MongoDB just work...  It is a service that essentially runs in the background.  You DO NOT need to path your db.  you DO NOT need to create a db folder.  your database will be created based on the database name you put in your `mongoose.connect()`, and the collection will be created based on the string you insert in your `mongoose.model()` 
  - SIDE NOTE: Sorry for any confusion, BUT the benefit of being able to accommodate the Windows folks is GOOD and It’s likely a better net result to give a little to much unnecssary info to you all, than to leave the Windows Folks high and dry
#### All that being said:
- Both Windows and Mac users should be able to confirm that things are working and populating your Database and Collection by running a few mongo shell commands
#### Shell Command How To:
1. the `mongo` command, run in the terminal, will take you to the mongo shell
1. the `db` command will list the current database you are using
1. `show dbs` will show all created dbs on your machine.  you should recognize the database from your mongoose.connect()
1. `use <database-name>` allows you to take a closer look at  a particular database
1. `show collections` allows you to see all the collections in that database
1. `db.<collection-name>.find()`  allows you to see all the contents of that collection - it may not look readable
1. `db.<collection-name>.find().pretty()` allows you to see all contents of that collection in a more readable format.
