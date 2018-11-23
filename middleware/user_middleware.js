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
    if(req.body.email == null) {
        console.log('Something left empty');
        next(err);
    } else if (req.body.passw === null && req.body.passw === '')
    else {
        if(/^[a-z](\.?[a-z0-9]){3,}@g(oogle)?mail\.com$/g.test(req.body.email))
        {
            if(req.body.passw.length >= 5)
            {
                if(/^[a-zA-Z0-9][\w!]{5,9}$/g.test(req.body.passw))
                {
                    next();
                }
                else {
                    console.log('Password Invalid');                    
                }
            }
            else {
                console.log('Password Incorrect');                
            }
        }
        else {
            console.log('Email_id not correct');            
        }
    }
}

/**
 * @description function formed as to perform middleware work for registration
 */
exports.register_middleware = function (req, res, next) {
    if(req.body == null) {
        console.log('Something left empty');
    }
    else {
        if(/^[a-z](\.?[a-z0-9]){3,}@g(oogle)?mail\.com$/g.test(req.body.email))
        {
            if(req.body.passw.length >= 5)
            {
                if(/^[a-zA-Z0-9][\w!]{5,9}$/g.test(req.body.passw))
                {
                    next();
                }
                else {
                    console.log('Password Invalid');                    
                }
            }
            else {
                console.log('Password Incorrect');                
            }
        }
        else {
            console.log('Email_id not correct');            
        }
    }
}

/**
 * @description function formed as to perform middleware work for registration
 */
exports.logout_middleware = function (req, res, next) {
    if(req.body == null) {
        console.log('Something left empty');
    }
    else {
        next();
    }
} 