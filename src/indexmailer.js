const express = require('express');
var router = express.Router();
const nodemailer = require('nodemailer');
const cors = require('cors');
const creds = require('./../src/Contact/form/config');



var transport = {
    host: 'smtp.gmail.com', // Don’t forget to replace with the SMTP host of your provider
    port: 587,
    auth: {
        name: creds.NAME,
        user: creds.USER,
        pass: creds.PASS
    }
};

var transporter = nodemailer.createTransport(transport);

transporter.verify((error, success) => {
    if (error) {
        console.log(error);
    } else {
        console.log('Server is ready to take messages');
    }
});

router.post('/send', (req, res, next) => {
    var name = req.body.fullName,
        email = req.body.email,
        message = req.body.message;
    var content = ` name: ${name} \n email: ${email} \n\n message: ${message} `;

    var mail = {
        from: name,
        to: 'richard.horsford@gmail.com',  // Change to email address that you want to receive messages on
        subject: 'New Message from Contact Form',
        text: content
    };

    transporter.sendMail(mail, (err, data) => {
        if (err) {
            res.json({
                status: 'fail'
            })
        } else {
            res.json({
                status: 'success'
            })
        }
    })
});

const app = express();
app.use(cors());
app.use(express.json());
app.use('/', router);
app.listen(3002);