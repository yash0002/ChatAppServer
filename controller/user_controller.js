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

exports.login_controller = function(req, res) {

    service.login_service_function(req, (err,data) => {
       
        if(err) res.status(400).send(err)
        else res.status(200).send(data);
    })
}
/**
 * @description Controller for register & sending response to client
 */
exports.register_controller = function(req, res) {
    
    service.register_service_function(req, (err,data) => {
        
        if(err) res.status(400).send(err)
        else res.status(200).send(data);        
    })
}