// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

// 引用 restaurant model
const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {
  const sortsData = req.query.sorts
  Restaurant.find()
    .lean()
    .sort(`${sortsData}`)
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

// 匯出路由模組
module.exports = router
