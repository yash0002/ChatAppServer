/**
 * @description this is service controlling the business logic and traversing controls from controller to model and vice versa
 * @author  Yash
 * @since   14/11/2018
 * @version 2.2.01
 */
const models = require('../app/models/chat_model');
const async = require('async');
/**
 * @description Chat service for storing message
 */
exports.chat_service_function = function (req, callback) {
let result_to_send;

//----------------Example of Async Waterfall------------
async.waterfall([

    function (callback) {
        models.chatsDb(req, (err, data) => {
            if (err) {
                callback(err);
            }
            else {             
                callback(null, data);
            }
        }) }, function(result, callback) {
            if(result != null ) {
                models.chatsDb_fetch((err, data) => {

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
        }], function (err, result_fetch){
    if(err) {
        console.log(err);           
    }
    else {      
        result_to_send = result_fetch;
    }
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

    models.chatsDb_fetch((err, data) => {

        if (err) {
            return callback(err);
        }
        else {
            callback(null, data);
        }
    });
}
