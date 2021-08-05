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
    password: '12345678',
    restaurantId: [1, 2, 3]
  },
  {
    name: 'User2',
    email: 'user2@example.com',
    password: '12345678',
    restaurantId: [4, 5, 6]
  }
]

const createRestaurantArr = []

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
        })) // 會回傳一個create好的資料
        .then(user => {
          const userId = user._id
          seedUsers[index].restaurantId.forEach(id => {
            restaurantList.forEach(restaurant => {
              if (restaurant.id === id) {
                restaurant.userId = userId
                createRestaurantArr.push(restaurant)
              }
            })
          })
        })
    }))
    .then(() => Restaurant.create(createRestaurantArr))
    .then(() => {
      console.log('seeder success')
      return process.exit()
    })
    .catch(error => console.log(error))
})
