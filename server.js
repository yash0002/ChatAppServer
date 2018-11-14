const express = require('express');
const connectionDb = require('./config/database_config');
const app = express();
// const port = process.env.PORT || 3001;
const login = require('./routes/login_route');
const register = require('./routes/register_route');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended : true}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
let router =express.Router();

router.get('/', function(req,res) {
  res.json({message: 'welcome to our upload module apis'});
});

/**
 * @description Router to get handle user registration
 */

 router.post('/register', login.register);
 router.post('/login', login.login)
 app.use('/api', router);
 app.listen(3001);

// console.log that your server is up and running
// app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
// app.get('/express_backend', (req, res) => {
  // res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
// });