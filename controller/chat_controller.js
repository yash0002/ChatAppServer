/**
 * @description Controller on Server side
 * @author Yash
 * @since 13/11/2018
 * @version 4.2.1
 */
/**
 * @description Controller performing all functions of controls movement and sending response to client
 */
const service = require('../services/chat_service');
const service_ref = require('../services/chat_ref_service');

exports.chat_controller = function(req, callback ) {

    console.log('Request on controller page');
    console.log(req);
    service_ref.chat_service_function(req, (err,data) => {        
        if(err) {
            callback(err)
        }
        else {
            callback(null, data)
        }
    })
}

/**
 * @description controller to get traversing controlls & send response to client from server
 */
exports.chat_fetch_controller = function(callback) {
    service_ref.chat_fetch_service_function( (err,data) => {
        if(err) {
            callback(err)
        }
        else {
            callback(null, data)
        }
    })
}