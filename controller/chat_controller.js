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

exports.chat_controller = function(req, res) {
    console.log('controller chatting');
    
    service.chat_service_function(req, (err,data) => {
       
        if(err) res.status(400).send(err)
        else res.status(200).send(data);
    })
}