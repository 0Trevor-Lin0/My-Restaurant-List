// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// const axios = require('axios')

// 引用 restaurant model
const Restaurant = require('../../models/restaurant')

// 讓使用者填寫表單頁面
router.get('/new', (req, res) => res.render('new'))

router.get('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const googleApiKey = process.env.GOOGLE_MAP_API
  return Restaurant.findOne({ userId, _id })
    .lean()
    // .then(detailData =>
    //   axios
    //     .get('https://maps.googleapis.com/maps/api/geocode/json?address=台灣台北市萬華區康定路190號&key=AIzaSyAIrvHWEeV49yW-1ENswj5TlxYpifj2m1w')
    //     .then(response => {
    //       console.log(response.data.results[0].geometry.location)
    //       // return response.data.results[0].geometry.location
    //     })
    // )
    .then(detailData => res.render('show', { detailData, googleApiKey }))
    .catch(error => console.log(error))
})

// 設定修改表單路由
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  // const restaurant = new Restaurant()
  // console.log(restaurant)
  return Restaurant.findOne({ userId, _id })
    .lean()
    .then(detailData => res.render('edit', { detailData }))
    .catch(error => console.log(error))
})

// 運用post將資料新增傳進資料庫
router.post('/', (req, res) => {
  const userId = req.user._id
  req.body.userId = userId
  return Restaurant.create(req.body)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// update資料至資料庫
router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ userId, _id })
    .then(detailData => {
      detailData = Object.assign(detailData, req.body)
      // detailData.name = editData.name
      // detailData.name_en = editData.name_en
      // detailData.category = editData.category
      // detailData.image = editData.image
      // detailData.location = editData.location
      // detailData.phone = editData.phone
      // detailData.google_map = editData.google_map
      // detailData.rating = editData.rating
      // detailData.description = editData.description
      return detailData.save()
    })
    .then(() => res.redirect(`/restaurants/${_id}`))
    .catch(error => console.log(error))
})

// 設定刪除特定資料路由
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ userId, _id })
    .then(detailData => detailData.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 匯出路由模組
module.exports = router
