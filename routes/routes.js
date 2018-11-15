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

const register_middleware = require('../middleware/register_middleware');
const login_middleware = require('../middleware/login_middleware');

const register_controller = require('../controller/register_controller');
const login_controller = require('../controller/login_controller');

/**
 * post method of express to send controls to controller from routes through middleware
 * post for registration
 */
express_router.post('/register',register_middleware.register_middleware, register_controller.register_controller);
/**
 * post for login
 */
express_router.post('/login', login_middleware.login_middleware, login_controller.login_controller);

module.exports= express_router;