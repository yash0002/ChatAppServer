
/**
 * @description function formed as to perform middleware work for login
 */
exports.chat_middleware = (req, res, next) => {
    if(req.body == null) console.log('Something left empty');
    else next();
}
