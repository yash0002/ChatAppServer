/**
 * @description this is service controlling the business logic and traversing controls from controller to model and vice versa
 * @author  Yash
 * @since   14/11/2018
 * @version 2.2.01
 */
const models = require('../app/models/chat_model');
/**
 * @description Chat service for storing message
 */
exports.chat_service_function = function (req, callback) {

    models.chatsDb(req, (err, data) => {

        if (err) {
            return callback(err);
        }
        else {
            callback(null, data);
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
