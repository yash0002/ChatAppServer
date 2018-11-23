/**
 * @description Controller on Server side
 * @author Yash
 * @since 13/11/2018
 * @version 4.2.1
 */
/**
 * @description Controller performing all functions of controls movement and sending response to client
 */
const service = require('../services/user_service');
'use strict';

const fs = require('fs');
const jwt = require('jsonwebtoken');

// PAYLOAD
var payload = {
    data1: "Data 1",
    data2: "Data 2",
};

// PRIVATE and PUBLIC key
// var privateKEY  = fs.readFileSync('../authentication/private.key', 'utf8');
// var publicKEY  = fs.readFileSync('../authentication/public.key', 'utf8');
var privateKEY = 'privateKey';

var i = 'bridgelabz';          // Issuer 
var s = 'login - some@user.com';        // Subject 
var a = 'http://mysoftcorp.in'; // Audience

// SIGNING OPTIONS
var signOptions = {
    issuer: i,
    subject: s,
    audience: a,
    expiresIn: "1h",//5000ms
    //  algorithm:  "RS256"
};

// var token = jwt.sign(payload, privateKEY, signOptions);
// console.log("Token - " + token);

exports.login_controller = function (req, res, next) {
    try {
        service.login_service_function(req, (err, data) => {

            if (err) {
                res.status(400).send(err);
            }
            else {

                var token = jwt.sign(payload, privateKEY, signOptions);
                console.log("Token - " + token);

                res.status(200).send(data);
            }
        })
    }
    catch (err) {
        next(err);
    }
}
/**
 * @description Controller for register & sending response to client
 */
exports.register_controller = function (req, res) {
    try {
        service.register_service_function(req, (err, data) => {

            if (err) res.status(400).send(err)
            else res.status(200).send(data);
        })
    }
    catch(err) {
        next(err);
    }
}

exports.logout_controller = function (req, res) {
    try {
        service.logout_service_function(req, (err, data) => {

            if (err) res.status(400).send(err)
            else res.status(200).send(data);
        })
    }
    catch (err) {
        next(err);
    }
}
/**
 * @description to verify token came from client side
 * var verifyOptions = {
 issuer:  i,
 subject:  s,
 audience:  a,
 expiresIn:  "12h",
 algorithm:  ["RS256"]
};

var legit = jwt.verify(token, publicKEY, verifyOptions);

console.log("\nJWT verification result: " + JSON.stringify(legit));
 */