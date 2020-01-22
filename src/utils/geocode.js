const request = require('request')

const geocode = (address, callback) => {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibXBlcnJ5MDAiLCJhIjoiY2s1ZTc4cnR5MjdxZDNwbGpiYnQ2cnkyYSJ9.C07sKAJh8Xvl60U-7CbnpA&limits=1'
  request({url, json: true}, (error, response) => {
    if (error) {
      callback('Unable to connect to the service, please check your internet connection', undefined)
    } else if (response.body.features.length === 0) {
      callback('Unable to find the location you entered, please enter the name of the nearest big city', undefined)
    } else {
      callback(undefined, {
        location: response.body.features[0].place_name,
        latitude: response.body.features[0].geometry.coordinates[0],
        longitude: response.body.features[0].geometry.coordinates[1]
      })
    }
  })
}


module.exports = geocode
