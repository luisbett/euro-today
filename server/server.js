require('dotenv').config()
const express = require('express')
const schedule = require('node-schedule')
const chart = require('./chart.js')
const sendEmail = require('./email.js')
const currency = require('./currency.js')

const PORT = process.env.PORT || 3333

const app = express()

//Define new rule instance
let rule = new schedule.RecurrenceRule()

//Define timezone
rule.tz = 'Europe/Dublin'

//Define time to 17:00:00
rule.second = 0
rule.minute = 0
rule.hour = 17

const job = schedule.scheduleJob(rule, async () => {

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