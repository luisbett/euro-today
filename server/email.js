const emailjs = require('@emailjs/nodejs')

module.exports = (templateParams) => {

    //Send email
    emailjs.send(process.env.SERVICE_ID, process.env.TEMPLATE_ID, templateParams, {
        publicKey: process.env.PUBLIC_KEY,
        privateKey: process.env.PRIVATE_KEY
    })
    .then(response => {
        console.log('SUCCESS!', response.status, response.text)
    }, error => {
        console.log('FAILED!', error)
    })

}