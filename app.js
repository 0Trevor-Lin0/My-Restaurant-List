const express = require('express')
const app = express()
const port = 3000
// require express-handlebars
const exphbs = require('express-handlebars')
// require restaurant.json
const restaurantList = require('./restaurant.json').results

// setting static files
app.use(express.static('public'))


// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.get(('/'), (req, res) => {
  res.render('index', { restaurants: restaurantList })
})

app.get(('/restaurants/:restaurant_id'), (req, res) => {
  const restaurant = restaurantList.find(data => data.id.toString() === req.params.restaurant_id)
  res.render('show', { restaurant })
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