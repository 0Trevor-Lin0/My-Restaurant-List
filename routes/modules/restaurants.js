// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

// 引用 restaurant model
const Restaurant = require('../../models/restaurant')

// 讓使用者填寫表單頁面
router.get('/new', (req, res) => res.render('new'))

router.get('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(detailData => res.render('show', { detailData }))
    .catch(error => console.log(error))
})

// 設定修改表單路由
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  const restaurant = new Restaurant()
  console.log(restaurant)
  return Restaurant.findById(id)
    .lean()
    .then(detailData => res.render('edit', { detailData }))
    .catch(error => console.log(error))
})

// 運用post將資料新增傳進資料庫
router.post('/', (req, res) => {
  const newData = req.body
  console.log(newData)
  return Restaurant.create({
    newData
  })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// update資料至資料庫
router.put('/:id', (req, res) => {
  const id = req.params.id
  const editData = req.body
  return Restaurant.findById(id)
    .then(detailData => {
      detailData.name = editData.name
      detailData.name_en = editData.name_en
      detailData.category = editData.category
      detailData.image = editData.image
      detailData.location = editData.location
      detailData.phone = editData.phone
      detailData.google_map = editData.google_map
      detailData.rating = editData.rating
      detailData.description = editData.description
      return detailData.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

// 設定刪除特定資料路由
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(detailData => detailData.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 匯出路由模組
module.exports = router
