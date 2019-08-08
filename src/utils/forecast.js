const request = require('request')

const forecast = (latitude, logitude, callback) => {

    const url = 'https://api.darksky.net/forecast/e58b69a99d487cf85c066778b01bd83d/' + latitude + ',' + logitude

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service', undefined)
        }
        else if (response.body.error) {
            callback('Unable to find the location: from forecast.js', undefined)
        }
        else {
            const current = response.body.currently
            // callback(undefined, {
            //     summary: response.body.daily.data[0].summary,
            //     location: response.body.timezone,
            //     temperature: current.temperature,
            //     chance: current.precipProbability
            // })            
            callback(undefined, response.body.daily.data[0].summary +
                ' It is currently ' + current.temperature +
                ' degrees out. Temperature Height: ' +
                response.body.daily.data[0].temperatureHigh +
                ' and Temperature Low: ' + response.body.daily.data[0].temperatureLow + '.  There is a ' + current.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast

// const url = 'https://api.darksky.net/forecast/e58b69a99d487cf85c066778b01bd83d/37.8267,-122.4233'

// request({ url: url, json: true }, (error, response) => {
//     // const data = JSON.parse(response.body)
//     // console.log(data.currently)
//     //console.log(response.body.currently)

//     if (error) {
//         console.log('Unable to connect to weather service')
//     }
//     else if (response.body.error) {
//         console.log('Unable to find the location')
//     }
//     else {
//         const current = response.body.currently
//         console.log(response.body.daily.data[0].summary + ' It is currently ' + current.temperature + ' degrees out. There is a ' + current.precipProbability + '% chance of rain.')
//     }

// })