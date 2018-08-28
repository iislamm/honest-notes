const nodemailer = require('nodemailer');
const mailerConfig = require('../config/mailer');

// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing

module.exports.forget = (user) => {
    nodemailer.createTestAccount((err, account) => {
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: mailerConfig.auth
        });
    
        // setup email data with unicode symbols
        let mailOptions = {
            from: '"Honest Notes" <honest.notess@gmail.com>', // sender address
            to: user.email, // list of receivers
            subject: 'Password reset', // Subject line
            html: `
            <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Password reset</title>

    <style>
        * {
            font-family: sans-serif;
        }
        .header {
            height: 90px;
            width: 100%;
            background-color: #333;
        }

        .header .logo {
            width: 292px;
            margin-left: 40px;
            margin-top: 25px;
        }

        .page-header {
            font-size: 3em;
            color: #333;
            text-align: center;

        }

        p {
            font-size: 1.2em;
            margin-left: 4%;
            max-width: 90%;
        }

        a, a:hover, a:focus {
            text-decoration: none;
            color: #566BFF;
        }
        
    </style>

</head>
<body>
    <div class="header">
        <img class="logo" src="http://islamelbanna.info/data/honest-notes/logo.png" alt="Honest Notes">
    </div>
    <h2 class="page-header">Password reset</h2>
    <p>Hello ${user.fullname}, you recently asked to reset your password. <br> <br> To reset you password please refer to <a href="http://localhost:3000/users/reset-password/${user._id}/${user.passwordReset.key}">this link</a>. <br><br>
         or visit this link from your browser https://honest-notes.herokuapp.com/users/reset-password/${user._id}/${user.passwordReset.key}
         <br><br><br>
         Best Regards, <br>
         Honest Notes team.
        </p>
</body>
</html>
            ` // html body
        };
    
        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        });
    });
    
}

module.exports.activation = (user) => {
    nodemailer.createTestAccount((err, account) => {
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: mailerConfig.auth
        });
    
        // setup email data with unicode symbols
        let mailOptions = {
            from: '"Honest Notes" <honest.notess@gmail.com>', // sender address
            to: user.email, // list of receivers
            subject: 'Psst! Complete your sign-up.', // Subject line
            html: `
            <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Password reset</title>

    <style>
        * {
            font-family: sans-serif;
        }
        .header {
            height: 90px;
            width: 100%;
            background-color: #333;
        }

        .header .logo {
            width: 292px;
            margin-left: 40px;
            margin-top: 25px;
        }

        .page-header {
            font-size: 3em;
            color: #333;
            text-align: center;

        }

        p {
            font-size: 1.2em;
            margin-left: 4%;
            max-width: 90%;
        }

        a, a:hover, a:focus {
            text-decoration: none;
            color: #566BFF;
        }
        
    </style>

</head>
<body>
    <div class="header">
        <img class="logo" src="http://islamelbanna.info/data/honest-notes/logo.png" alt="Honest Notes">
    </div>
    <h2 class="page-header">Pssst!</h2>
    <p>Hello ${user.fullname} <br> <br> Complete your sign up and activate your e-mail by clicking <a href="https://honest-notes.herokuapp.com/users/activate/${user._id}/${user.activationCode}">this link</a>. <br><br>
         or visit this link from your browser https://honest-notes.herokuapp.com/users/activate/${user._id}/${user.activationCode}
         <br><br><br>
         Best Regards, <br>
         Honest Notes team.
        </p>
</body>
</html>
            ` // html body
        };
    
        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        });
    });
}