const express = require('express')
const exphbs = require('express-handlebars')
// 載入 method-override
const methodOverride = require('method-override')
// 引用路由器
const routes = require('./routes')
// 引入express-session
const session = require('express-session')
const usePassport = require('./config/passport')
require('./config/mongoose')

const app = express()
const port = 3000

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
  secret: 'foodCode',
  resave: false,
  saveUninitialized: true
}))

usePassport(app) // 要寫在routes前

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  next()
})

// 將 request 導入路由器
app.use(routes)

app.listen(port, () => {
  console.log(`ok! it's running on http://localhost:${port}`)
})
