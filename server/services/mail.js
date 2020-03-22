var nodemailer = require('nodemailer');

function sendMail(reciever, subject, content) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'todoapp.test123@gmail.com',
            pass: 'Test1234%'
        }
    });

    var mailOptions = {
        from: 'todoapp.test123@gmail.com',
        to: reciever,
        subject: subject,
        html: content
    };

    return transporter.sendMail(mailOptions);
}

module.exports = sendMail;


