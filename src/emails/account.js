const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'gi.charkviani@gmail.com',
        subject: 'Thanks for joining in!',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
    })
}

const sendCencelationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'gi.charkviani@gmail.com',
        subject: 'Goodbye!',
        text: `are you okay, ${name}`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCencelationEmail
}

