// require套件
const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
// 載入 connect-flash
const flash = require('connect-flash')
const routes = require('./routes')
// 引入express-session
const session = require('express-session')
const usePassport = require('./config/passport')

const app = express()

// 隱藏敏感資訊與環境變數
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

require('./config/mongoose')
const port = process.env.PORT

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(express.urlencoded({ extended: true }))

// 設定每一筆請求都會透過 methodOverride 進行前置處理
app.use(methodOverride('_method'))

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

usePassport(app) // 要寫在routes前

app.use(flash())

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg') // 設定 success_msg 訊息
  res.locals.warning_msg = req.flash('warning_msg') // 設定 warning_msg 訊息
  res.locals.error = req.flash('error')
  next()
})

// 將 request 導入路由器
app.use(routes)

app.listen(port, () => {
  console.log(`ok! it's running on http://localhost:${port}`)
})
