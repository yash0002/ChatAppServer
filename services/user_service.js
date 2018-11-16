const express = require('express');
const models = require('../models/user_model');

exports.login_service_function = function(req, res) {
    models.loginDb(req.body, (err, data) => {
        if(err) {
            res.send(err)
        }
        else
        {
            callback(null, data);
        }
    });
}
exports.register_service_function = function(req, res) {
    console.log('in service before goining in');
    console.log('req body pass ----------- ', req.body.passw);
    console.log('req body  -----------', req.body.email);
    
    models.registerDb(req, (err, data) => {
        if(err) {
            res.send(err)
        }
        else
        {
            console.log('retuned from model');            
           return callback(null, data);
        }
        console.log('return complete from model');
    })
}