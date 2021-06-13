// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引入模組程式碼
const home = require('./modules/home')
const restaurants = require('./modules/restaurants')
const search = require('./modules/search')
const sorts = require('./modules/sorts')

// 將網址結構符合 / 字串的 request 導向 home 模組
router.use('/', home)
router.use('/restaurants', restaurants)
router.use('/search', search)
router.use('/sorts', sorts)

// 匯出路由器
module.exports = router
