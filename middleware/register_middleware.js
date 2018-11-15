
/**
 * @description function formed as to perform middleware work
 */
exports.register_middleware = function register_middleware(req, res, next) {
    if(req.body ==null)
    console.log('Something left empty');
    else
    next();
}