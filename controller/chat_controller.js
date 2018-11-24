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
const service_peer_service = require('../services/chat_peer_service');

/**
 * @description Saving Chats in Group Chat Db
 */
exports.chat_controller = function (req, callback) {
    console.log('controller page -- ', req);
    // try {
        // if (req.email_id != null && req.email_id != undefined ) throw 'email_id invalid'
        //  {
        //      console.log('email_id correct');
            if (req.message_sent != "" ) //throw 'message empty' (null || req.message_sent !== undefined || req.message_sent.length !== 0) throw 'message invalid' 
            {

                console.log('Request on controller page');
                console.log(req);
                console.log(typeof req);
                let message = `${req.message_sent} on ${new Date().toDateString()} at ${new Date().toLocaleTimeString()}`;
                let requset_object = {
                    email_id: req.email_id,
                    message: message
                }
                service_ref.chat_service_function(requset_object, (err, data) => {
                    if (err) {
                        callback(err)
                    }
                    else {
                        callback(null, data)
                    }
                })
            }
        // }

    // }
    // catch (err) {
    //     // res.status(400).send(err);
    //     console.log(err);
    // }
}

/**
 * @description controller to get traversing controlls & send response to client from server - Group Chats
 */
exports.chat_fetch_controller = function (callback) {
    service_ref.chat_fetch_service_function((err, data) => {
        if (err) {
            callback(err)
        }
        else {
            callback(null, data)
        }
    })
}

/**
 * @description Controller for peer chats Saving
 */
exports.chat_peer_controller = function (req, callback) {

    try {
        // if (req.email_id !== null || req.email_id !== undefined || req.email_id.length !== 0) throw 'email_id invalid' 
        // {
        //     if (req.message !== null || req.message !== undefined || req.message.length !== 0) throw 'message invalid'
        //     {
                console.log('Request on controller page');
                console.log(req);
                console.log(typeof req);
                let message = `${req.message_sent} on ${new Date().toDateString()} at ${new Date().toLocaleTimeString()}`;
                let requset_object = {
                    sender_email_id: req.sender_email_id,
                    receiver_email_id: req.receiver_email_id,
                    message_sent: message
                  };              
              
                // console.log('Request on controller page');
                // console.log(req);
                service_peer_service.chat_peer_service_function(requset_object, (err, data) => {
                    if (err) {
                        callback(err)
                    }
                    else {
                        callback(null, data)
                    }
                })
        //     }
        // }
    }
    catch (err) {
        // res.status(400).send(err)
        console.log(err);
    }
}

/**
 * @description Controller for peer chats fetching chats
 */
exports.chat_peer_fetch_controller = function (callback) {
    service_peer_service.chat_peer_fetch_service_function((err, data) => {
        if (err) {
            callback(err)
        }
        else {
            // console.log('data on controller');
            // console.log(data);            
            callback(null, data)
        }
    })
}