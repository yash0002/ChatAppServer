const express = require('express');
const app = express();
const mongoose = require('mongoose');
const db_connect = require('./config/database_config');
const routes = require('./routes/routes');
const bodyParser = require('body-parser');
// const port = process.env.PORT || 3001;
// app.listen(port, () => console.log(`Listening on port ${port}`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true}));
app.use('/', routes);
app.listen(3001,()=>{
  console.log('server is up and running');
});

let db_url = db_connect.url;
console.log(db_url);

startMongo(db_url);

function startMongo(db_url)
{
  mongoose.connect(db_url, {useCreateIndex: true, useNewUrlParser: true});
  mongoose.connection.on('error', (error) => { console.log('Connection error with MongoDb');  });
  mongoose.connection.on('open', () => { console.log('Successfully Connected to MongoDb');  });
}

// router.get('/', function(req,res) {
//   res.json({message: 'welcome to our upload module apis'});
// });

// app.use( session ({
//   secret : 'fraggle-rock', //random string
//   resave : false,
//   saveUninitialized : false
// }))

// create a GET route
// app.get('/express_backend', (req, res) => {
  // res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
// });