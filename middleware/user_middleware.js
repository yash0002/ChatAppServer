/**
 * @description Middleware page to get credentials check on middleware rather on controller directly
 * @author  Yash
 * @since   12/11/2018
 * @module  Server
 * @version 8.2
 */

/**
 * @description function formed as to perform middleware work for login
 */
exports.login_middleware = function login_middleware(req, res, next) {
    if(req.body == null) console.log('Something left empty');
    else next();
}

/**
 * @description function formed as to perform middleware work for registration
 */
exports.register_middleware = function (req, res, next) {
    if(req.body == null) console.log('Something left empty');
    else next();
}

/**
 * @description function formed as to perform middleware work for registration
 */
exports.logout_middleware = function (req, res, next) {
    if(req.body == null) console.log('Something left empty');
    else next();
}