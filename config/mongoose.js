// 載入 mongoose
const mongoose = require('mongoose')

// 設定連線到 mongoDB
mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })
// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => console.log('mongodb error!'))
// 連線成功
db.once('open', () => console.log('mongodb connected!'))

module.exports = db
