const chalk = require('chalk')
const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')



const app = express()
    ///// PATHES
const publicDirPath = path.join(__dirname, '../public')
const viewsDirPath = path.join(__dirname, '../templates/views')
const partialsDirPath = path.join(__dirname, '../templates/partials')
    ///// SET DIR
app.set('view engine', 'hbs')
app.set('views', viewsDirPath)
app.use(express.static(publicDirPath))
hbs.registerPartials(partialsDirPath)

app.get('', (req, res) => {
  res.render('index', {
    name: 'Mohamed Perry',
    title: 'Weather Website'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    name: 'Mohamed Perry',
    title: 'About Page'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    name: 'Mohamed Perry',
    title: 'Help Page'
  })
})

app.get('/weather', (req, res) => {
  if(!req.query.address) {
    return res.send({
      error: 'You must provide an address'
    })
  }
  geocode(req.query.address, (error, {location, latitude, longitude} = {}) => {
    if (error) {
      return res.send({ error })
    }
    forecast(latitude, longitude, (error, {windSpeed, temperature, rain, summary, timezone} = {} ) => {
      if (error) {
        return res.send ({ error })
      }
      const weather = summary + '. The temperature is ' + temperature + ' si. And the probabilty of rain is ' + rain + '%'
      return res.send({
        location,
        weather
      })
    })
  })
})
app.get('*', (req, res) => {
  res.render('404', {
    name: 'Mohamed Perry',
    title: 'Error, No page found'
  })
})



app.listen(3000, () => {
  console.log('Server is up and running on port 3000')
})
