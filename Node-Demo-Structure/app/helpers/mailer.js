var nodemailer = require('nodemailer');

 class Mailer{
    sendMail(){
        console.log('called');
        
    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        service: 'gmail',
        auth: {
            user: 'vijayprajapati8690@gmail.com',
            pass: 'prajapati8690'
        }
        });
    var mailOptions = {
        from:'vijayprajapati8690@gmail.com',
        to: 'vijayprajapati.vp8@gmail.com',
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
        };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
        });
    }
  
}
 
module.exports = Mailer