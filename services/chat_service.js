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
async.waterfall([

    function (callback) {
        models.chatsDb(req, (err, data) => {

            if (err) {
                console.log('error on service page --1');
                callback(err);
            }
            else {
                console.log('data on service page -- 1');
                console.log(data);                
                callback(null, data);
            }
        }) }, function(result, callback) {
            if(result != null ) {
                models.chatsDb_fetch((err, data) => {

                    if (err) {
                        console.log('error on service page--2--in if ');
                        console.log(err);                        
                        return callback(err);
                    }
                    else {
                        console.log('data on service page-- 2 in if ');
                        console.log(data);                        
                        callback(null, data);
                    }
                });
            }
            else {
                console.log('error on service page-- 2 outside if');
                callback(result);
            }
        }], function (err, result_fetch){ //, callback) {
    if(err) {
        console.log('error on service page-- 3');     
        console.log(err);           
        // return callback(err);
    }
    else {
        console.log('result_fetch on service page-- 3');        
        console.log(result_fetch);        
        result_to_send = result_fetch;
        // return callback(result_fetch);
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
//------------------------------------------------------
//----------------Example of Async Waterfall------------
// async_waterfall ([
//     function(callback) {
//         var display_array = chat_service.chat_app_socket_on();
//         callback(null, display_array);
//     } ], function (err, result) {
//             if(err) {
//                 console.log('error on component page while fetching chats');
//                 console.log(err);
//             }
//             else {
//                 console.log('------------------display array---------------');
//                 console.log(result);
//             }
//         })

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
