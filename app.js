const express = require('express')
// require express-handlebars
const exphbs = require('express-handlebars')
// 載入 mongoose
const mongoose = require('mongoose')
// 載入 method-override
const methodOverride = require('method-override')
// 引用路由器
const routes = require('./routes')

const app = express()
const port = 3000
// 設定連線到 mongoDB
mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })
// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => console.log('mongodb error!'))
// 連線成功
db.once('open', () => console.log('mongodb connected!'))

// setting static files
app.use(express.static('public'))

// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(express.urlencoded({ extended: true }))

// 設定每一筆請求都會透過 methodOverride 進行前置處理
app.use(methodOverride('_method'))

// 將 request 導入路由器
app.use(routes)

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.listen(port, () => {
  console.log(`ok! it's running on http://localhost:${port}`)
})
