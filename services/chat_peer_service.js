/**
 * @description this is service controlling the business logic and traversing controls from controller to model and vice versa
 * @author  Yash
 * @since   14/11/2018
 * @version 2.2.01
 */
const user_model = require('../app/models/user_model');
const chat_peer_model = require('../app/models/chat_peer_model');
const async = require('async');
var nodemailer = require('nodemailer');
/**
 * @description Chat service for storing message
 */
exports.chat_service_function = function (req, callback) {
let result_to_send;

console.log('Request on Service page');
console.log(req);
console.log(req.email_id);
console.log(req.message);
console.log('------');

//----------------Example of Async Waterfall------------
async.waterfall([

    function (callback) {

        // user_model.User_Check_Sender_chatDb(req, (err, data) => {
        //     if (err) {
        //         callback(err);
        //     }
        //     else {             
        //         callback(null, req, data);
        //     }

        // }) }, function(req, result, callback) {
        //     user_model.User_Check_Receiver_chatDb(req, (err, data) => {
        //         if (err) {
        //             callback(err);
        //         }
        //         else {             
        //             callback(null, req, data);
        //         }
    
        //     })
        //}, 
        function(req, result, callback) {
            
            if(result != null ) {
            
                models_chats.chatsDb(req, result, (err, data) => {

                    if (err) {                     
                        return callback(err);
                    }
                    else {
                        callback(null, data);
                    }
                });
            }
            else {
                callback(result);
            }

        }, function(result, callback) {
            
            if(result != null ) {
                models_chats.chatsDb_fetch((err, data) => {

                    if (err) {                     
                        return callback(err);
                    }
                    else {
                        callback(null, data);
                    }
                });
            }
            else {
                callback(result);
            }
        }

    ], function (err, result_fetch){
    if(err) {
        console.log(err);           
    }
    else {      
        result_to_send = result_fetch;
    }
    //------------------------------
    if(result_to_send == null)
    {
        return callback(null);
    }
    else {
        return callback(result_to_send);
    }
});
}

/**
 * @description Chat service for fetching data
 */
exports.chat_fetch_service_function = function (callback) {

    models_chats.chatsDb_fetch((err, data) => {

        if (err) {
            return callback(err);
        }
        else {
            callback(null, data);
        }
    });
}
