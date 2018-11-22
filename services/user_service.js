/**
 * @description this is service controlling the business logic and traversing controls from controller to model and vice versa
 * @author  Yash
 * @since   14/11/2018
 * @version 2.2.01
 */
const models = require('../app/models/user_model');
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
           user: 'labzbridge02@gmail.com',
           pass: 'bridge01!'
       }
   });

/**
 * @description Way to setup nodemailer to send mails via gmail service
 * var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
               user: 'your gmail account email id @gmail.com',
               pass: 'your password'
           }
       });

       const mailOptions = {
        from: 'sender@email.com', // sender address
        to: 'to@email.com', // list of receivers
        subject: 'Subject of your email', // Subject line
        html: '<p>Your html here</p>'// plain text body
      };

      transporter.sendMail(mailOptions, function (err, info) {
        if(err)
            console.log(err)
        else
            console.log(info);
        });
 */
/**
 * @description login service
 */
exports.login_service_function = function(req, callback) {
    
    models.loginDb(req, (err, data) => {

        if(err) return callback(err);
        else callback(null, data);
    });
}

/**
 * @description registration service
 */
exports.register_service_function = function(req, callback) {

    models.registerDb(req, (err, data) => {

        if(err) {
            return callback(err);
        }
        else {

            const mailOptions = {
                from: 'labzbridge02@gmail.com', // sender address
                to: req.body.email, // list of receivers
                subject: 'Registration Successful on ChatApp', // Subject line
                html: '<p>Your are most Welcome to chat on ChatApp anytime. Thank You!</p>'// plain text body
            };

            transporter.sendMail(mailOptions, function (err, info) {
                if(err) {
                    console.log('Email not sent');
                    
                    console.log(err)
                }
                else {
                    console.log('email Sent');
                    console.log(info);
                }
                    
                });

            return callback(null, data);
        }

    })
}

/**
 * @description registration service
 */
exports.logout_service_function = function(req, callback) {

    models.logoutDb(req, (err, data) => {

        if(err) return callback(err);
        else return callback(null, data);

    })
}