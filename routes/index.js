// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引入模組程式碼
const home = require('./modules/home')
const restaurants = require('./modules/restaurants')
const search = require('./modules/search')
const sorts = require('./modules/sorts')
const users = require('./modules/users')
const { authenticator } = require('../middleware/auth') // 掛載 middleware

router.use('/restaurants', authenticator, restaurants)
router.use('/search', authenticator, search)
router.use('/sorts', authenticator, sorts)
router.use('/users', users)
router.use('/', authenticator, home)

// 匯出路由器
module.exports = router
