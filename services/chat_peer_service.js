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
exports.chat_peer_service_function = function (req, callback) {
let result_to_send, request_data = [];;

let sender_email_id_in_request = req.sender_email_id;
let receiver_email_id_in_request = req.receiver_email_id;
let message = req.message_sent;
let sender_id_user_db, receiver_id_user_db;


// console.log('Request on Service page');
// console.log(req);
// console.log(req.sender_email_id);
// console.log(req.receiver_email_id);
// console.log(req.message_sent);
// console.log('------');

//----------------Example of Async Waterfall------------
async.waterfall([

    function (callback) {

        user_model.User_Check_peer_chatDb(sender_email_id_in_request, (err, data) => {
                if (err) {
                    callback(err);
                }
                else {             
                    callback(null, data);
                }
            })
         }, function(result1, callback) {
            
            sender_id_user_db = result1._id;

            user_model.User_Check_peer_chatDb(receiver_email_id_in_request, (err, data) => {
                if(result1 != null) {

                    if (err) {
                        callback(err);
                    }
                    else {             
                        callback(null, data);
                    }
        
                }
                else {
                    callback(result1);
                }
                
            })
        }, function(result2, callback) {
            
            receiver_id_user_db = result2._id;

            if(result2 != null ) {
                
                console.log('Service Page -----');
                console.log(sender_id_user_db);
                console.log(receiver_id_user_db);
                console.log(message);
                
                request_data = {
                    sender_id : sender_id_user_db,
                    receiver_id : receiver_id_user_db,
                    message : message,
                    sender_email_id : sender_email_id_in_request,
                    receiver_email_id : receiver_email_id_in_request
                }
                
                chat_peer_model.peerschatDb_save(request_data, (err, data) => {

                    if (err) {                     
                        return callback(err);
                    }
                    else {
                        callback(null, data);
                    }
                });
            }
            else {
                callback(result2);
            }

        }, function(result_of_save, callback) {
            
            if(result_of_save != null ) {
                
                chat_peer_model.peerschatDb_fetch((err, data) => {

                    if (err) {                     
                        return callback(err);
                    }
                    else {
                        callback(null, data);
                    }
                });
            }
            else {
                callback(result_of_save);
            }
        }
        
    ], function (err, result_fetch){        //Waterfall functions send result in below function
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
exports.chat_peer_fetch_service_function = function (callback) {

    chat_peer_model.peerschatDb_fetch((err, data) => {

        if (err) {
            return callback(err);
        }
        else {
            // console.log('data on service');
            // console.log(data);            
            callback(null, data);
        }
    });
}
