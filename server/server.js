const express = require('express')
require('dotenv').config()
const schedule = require('node-schedule')
const chart = require('./chart.js')
const sendEmail = require('./email.js')
const currency = require('./currency.js')

const PORT = process.env.PORT || 3333

const app = express()

const job = schedule.scheduleJob('0 17 * * *', async () => {

    //Save the json object returned from API
    let currencyData = await currency()

    //Get the chart image
    let imgSrc = chart(currencyData)

    //Set the euro amount today
    let value = Object.values(currencyData.rates).pop()

    let euroToday = Number(value.BRL.toFixed(2))

    //Define the HTML to be sent trough email
    var templateParams = {
        currencyhtml: `<h3>Euro today: € ${euroToday}</h3>
                        <p>See below the chart for last month:</p>
                        <img src="${imgSrc}" alt="Last month euro chart" style="width: 800px; height: 400px" />`
    }

    //Send email
    sendEmail(templateParams)
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})