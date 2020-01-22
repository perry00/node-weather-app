const request = require('request')

const forecast = (latitude, longitude, callback) => {
  const url = 'https://api.darksky.net/forecast/ff061548f2b6db6a12338a2f4f632f24/'+ latitude + ',' + longitude + '?units=si'
  request({url, json: true}, (error, response) => {
    if (error) {
      callback('Problem with the service. Please, contact the admins', undefined)
    } else if (response.body.error) {
      callback('Problem with the configuration. Contact the admins', undefined)
    } else {
      callback(undefined, {
        summary: response.body.currently.summary,
        timezone: response.body.timezone,
        temperature: response.body.currently.temperature,
        rain: response.body.currently.precipProbability,
        windSpeed: response.body.currently.windSpeed
      })
    }
  })
}


module.exports = forecast
