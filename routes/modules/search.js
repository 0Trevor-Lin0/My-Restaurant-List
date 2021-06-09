// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

// 引用 restaurant model
const Restaurant = require('../../models/restaurant')

// set search route
router.get(('/'), (req, res) => {
  // let letter lower case & clear all space
  let restaurants = []
  const keyword = req.query.keyword.toLocaleLowerCase().replace(/\s*/g, '')
  return Restaurant.find()
    .lean()
    .then(restaurantLists => {
      restaurants = restaurantLists.filter(data => {
        const dataName = data.name.toLocaleLowerCase().replace(/\s*/g, '')
        const dataCategory = data.category.toLocaleLowerCase().replace(/\s*/g, '')
        return (dataName.includes(keyword)) || (dataCategory.includes(keyword))
      })
      return restaurants
    })
    .then(() => {
      // if search 0 results, showNothing
      restaurants.length === 0 ? res.render('showNothing') : res.render('index', { restaurants, keyword })
    })
    .catch(error => console.log(error))
})

module.exports = router
