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
    models.registerDb(req.body, (err, data) => {
        if(err) {
            res.send(err)
        }
        else
        {
            callback(null, data);
        }
    })
}