const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
// const port = process.env.PORT || 3000

// Define Path for Express config
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup Static directory (ex, css, img, js)
app.use(express.static(publicDir))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather HBS Page',
        name: 'Seongwan Ahn'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About HBS Page',
        name: 'Seongw Ahn'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help HBS',
        info: 'Some info will be here...',
        name: 'Seongwan ahn'
    })
})

app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: 'You must provide search term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'YOu must provide address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send( {error: error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error: error })
            }
            res.send ({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
        })
    })
})

// app.get('/products', (req, res) => {

//     if (!req.query.search) {
//         return res.send({
//             error: 'You must provide a search term'
//         })
//     }

//     console.log(req.query.search)
//     res.send({
//         products: []
//     })
// })

// app.get('/help/*', (req, res) => {
//     //res.send('Help article not found')
//     res.render('404', {
//         title: '404',
//         name: 'Seongwan',
//         errorMessage: 'Help article not found!!'
//     })
// })

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Seongwan Ahn',
        errorMessage: 'Help article not found!!'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Seongwan Ahn',
        errorMessage: 'No page found!'
    })
})


app.listen(3000, () => {
    console.log('server is up op port 3000')
})
