const mongoose = require('mongoose')
// 載入 restaurant model
const Restaurant = require('../restaurant')
//載入restaurant.json資料
const originalList = require('../../restaurant.json')
mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => console.log('mongodb error!'))
db.once('open', () => {
  console.log('mongodb connected!')

  originalList.results.forEach(data => {
    Restaurant.create({
      name: `${data.name}`,
      name_en: `${data.name_en}`,
      category: `${data.category}`,
      image: `${data.image}`,
      location: `${data.location}`,
      phone: `${data.phone}`,
      google_map: `${data.google_map}`,
      rating: `${data.rating}`,
      description: `${data.description}`,
    })
  });

  console.log('create done!')
})