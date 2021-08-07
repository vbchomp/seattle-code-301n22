'use strict';

module.exports = getPictures;
//module.exports = {getPictures, Picture}

const axios = require('axios');

//module.exports = async function (req, res) {
async function getPictures(req, res) {
  let searchQuery = req.query.searchQuery;

  let results = await axios.get(`https://api.unsplash.com/search/photos?query=${searchQuery}&client_id=${process.env.UNSPLASH_ACCESS_KEY}`);
​
  res.send(results.data.results.map(pic => new Picture(pic)));
}
class Picture {
  constructor(image) {
    this.src = image.urls.regular;
    this.alt = image.alt_description;
    this.photographer = image.user.name
  }
}
