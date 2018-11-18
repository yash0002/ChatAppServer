/**
 * @author Yash
 * @description 
 * @version 2.1
 * @since 12/11/2018
 * @package express, express router
 */

/**
 * importing express
 */
const express = require('express');
const app = express();
const express_router = express.Router();
const middleware = require('../middleware/user_middleware');
const user_controller = require('../controller/user_controller');

const chat_middleware = require('../middleware/chat_middleware');
const chat_controller = require('../controller/chat_controller');
/**
 * post method of express to send controls to controller from routes through middleware
 * post for registration
 */
express_router.post('/register', middleware.register_middleware, user_controller.register_controller);
/**
 * post for login
 */
express_router.post('/login', middleware.login_middleware, user_controller.login_controller);
/**
 * get for messages for chatting application
 */
express_router.post('/logout', middleware.logout_middleware, user_controller.logout_controller)
/**
 * @exports express_router so the flow can include express router and get the proper routng to required task
 */
module.exports= express_router;