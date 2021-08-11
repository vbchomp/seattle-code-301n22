'use strict';

const axios = require('axios');

let cache = {};

// what we know about ojects:
// cache.query = 'some data';
// let timestamp = 'now';
// cache[timestamp] = 'today';
// console.log(' my cahce: ', cache);

let getPictures = async (req, res) => {
  let searchQuery = req.query.searchQuery;
  // we determine appropriate amount of time for cahce infalidation and impletent
  if(cache[searchQuery] &&
    // validate time here
    Date.now() - cache[searchQuery].timestamp < (1000 * 10)){
    console.log('cache hit, HOORAY');

    // if we get Here, just send along the data
    res.send(cache[searchQuery].pictures);
  } else {
    let results = await axios.get(`https://api.unsplash.com/search/photos?query=${searchQuery}&client_id=${process.env.UNSPLASH_ACCESS_KEY}`);

    let picturesArray = results.data.results.map(pic => new Picture(pic));
    console.log('cahce miss, BOO');
    cache[searchQuery] = {
      pictures: picturesArray,
      timestamp: Date.now(),
    };

    res.send(picturesArray);

  }

};

class Picture {
  constructor(image) {
    this.src = image.urls.regular;
    this.alt = image.alt_description;
    this.photographer = image.user.name;
  }
}

module.exports = getPictures;
