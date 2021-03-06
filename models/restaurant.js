const mongoose = require('mongoose')
const Schema = mongoose.Schema
const RestaurantSchema = new Schema({
  name: {
    type: String, // 資料型別是字串
    require: true // 這是個必填欄位
  },
  name_en: {
    type: String,
    require: true
  },
  category: {
    type: String,
    require: true
  },
  image: {
    type: String,
    require: true
  },
  location: {
    type: String,
    require: true
  },
  phone: {
    type: String,
    require: true
  },
  google_map: {
    type: String,
    require: true
  },
  rating: {
    type: Number,
    require: true
  },
  description: {
    type: String,
    require: true
  },
  userId: { // 加入關聯設定
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    require: true
  }

})

module.exports = mongoose.model('Restaurant', RestaurantSchema)
