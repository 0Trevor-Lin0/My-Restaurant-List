const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const Restaurant = require('../restaurant')
const User = require('../user')
// 載入restaurant.json資料
const restaurantList = require('../../restaurant.json').results
const db = require('../../config/mongoose')

const seedUsers = [
  {
    name: 'User1',
    email: 'user1@example.com',
    password: '12345678'
  },
  {
    name: 'User2',
    email: 'user2@example.com',
    password: '12345678'
  }
]

db.once('open', () => {
  Promise
    .all(Array.from(seedUsers, (seedUser, index) => {
      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(seedUser.password, salt))
        .then(hash => User.create({
          name: seedUser.name,
          email: seedUser.email,
          password: hash
        }))
        .then(user => {
          const userId = user._id
          return Promise.all(Array.from({ length: 3 }, (_, i) => {
            restaurantList[(i + index * 3)].userId = userId
            return Restaurant.create(restaurantList[i + index * 3])
          }))
          // for (let i = (0 + index * 3); i < (3 + index * 3); i++) {
          //   restaurantList[i].userId = userId
          //   Restaurant.create(restaurantList[i])
          // }
        })
    }))
    .then(() => {
      console.log('seeder success')
      return process.exit()
    })
})
