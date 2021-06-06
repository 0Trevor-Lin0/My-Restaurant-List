const express = require('express')
// require express-handlebars
const exphbs = require('express-handlebars')
// 載入 mongoose
const mongoose = require('mongoose')
// 載入restaurant model
const Restaurant = require('./models/restaurant')

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


// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

//讓使用者填寫表單頁面
app.get('/restaurants/new', (req, res) => res.render('new'))

app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(detailData => res.render('show', { detailData }))
    .catch(error => console.log(error))
})

//運用post將資料新增傳進資料庫
app.post('/restaurants', (req, res) => {
  const newData = req.body
  return Restaurant.create({
    name: `${newData.name}`,
    name_en: `${newData.name_en}`,
    category: `${newData.category}`,
    image: `${newData.image}`,
    location: `${newData.location}`,
    phone: `${newData.phone}`,
    google_map: `${newData.google_map}`,
    rating: `${newData.rating}`,
    description: `${newData.description}`
  })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// set search route
app.get(('/search'), (req, res) => {
  // let letter lower case & clear all space
  const keyword = req.query.keyword.toLocaleLowerCase().replace(/\s*/g, "")
  const restaurants = restaurantList.filter(data => {
    const dataName = data.name.toLocaleLowerCase().replace(/\s*/g, "")
    const dataCategory = data.category.toLocaleLowerCase().replace(/\s*/g, "")
    return (dataName.includes(keyword)) || (dataCategory.includes(keyword))
  })
  // if search 0 results, showNothing
  restaurants.length === 0 ? res.render('showNothing') : res.render('index', { restaurants, keyword })
})

app.listen(port, () => {
  console.log(`ok! it's running on http://localhost:${port}`)
})