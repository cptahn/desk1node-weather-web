const request = require('request')
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiY3B0YWhuIiwiYSI6ImNqdjhmOHRtNTAwM2UzeWxjdTIzN240ZmEifQ.gnDek1zpMT0nRrt7cEjnVw&limit=1'

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to location service', undefined)
        }
        else if (response.body.features.length === 0) {
            callback('Unable to find the location. Try another search. : from geocde.js', undefined)
        }
        else {
            callback(undefined, {
                longitude: response.body.features[0].center[0],
                latitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode

// const geoUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoiY3B0YWhuIiwiYSI6ImNqdjhmOHRtNTAwM2UzeWxjdTIzN240ZmEifQ.gnDek1zpMT0nRrt7cEjnVw&limit=1'

// request({ url: geoUrl, json: true }, (error, response) => {
//     if (error) {
//         console.log('Unable to connect to weather service')
//     }
//     else if (response.body.features.length === 0) {
//         console.log('Unable to find the location')
//     }
//     else {
//         const longitude = response.body.features[0].center[0]
//         const latitude = response.body.features[0].center[1]
//         console.log(longitude, latitude)

//     }

// })


