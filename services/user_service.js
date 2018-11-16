/**
 * @description this is service controlling the business logic and traversing controls from controller to model and vice versa
 * @author  Yash
 * @since   14/11/2018
 * @version 2.2.01
 */
const models = require('../app/models/user_model');
/**
 * @description login service
 */
exports.login_service_function = function(req, callback) {
    
    models.loginDb(req.body, (err, data) => {

        if(err) return callback(err);
        else callback(null, data);
    });
}

/**
 * @description registration service
 */
exports.register_service_function = function(req, callback) {

    models.registerDb(req, (err, data) => {

        if(err) return callback(err);
        else return callback(null, data);

    })
}