
/**
 * @description function formed as to perform middleware work
 */
exports.login_middleware = function login_middleware(req, res, next) {
    if(req.body ==null)
    console.log('Something left empty');
    else
    next();
}