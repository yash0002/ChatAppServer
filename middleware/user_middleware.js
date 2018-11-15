
/**
 * @description function formed as to perform middleware work for login
 */
exports.login_middleware = function login_middleware(req, res, next) {
    if(req.body ==null)
    console.log('Something left empty');
    else
    next();
}

/**
 * @description function formed as to perform middleware work for registration
 */
exports.register_middleware = function (req, res, next) {
    if(req.body ==null)
    console.log('Something left empty');
    else
    next();
}