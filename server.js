/**
 * @description Server Side (complete node js structure & database schema based connection)
 * @author Yash
 * @version 11.1
 * @module Server
 * @since 12/11/2018
 */
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const db_connect = require('./config/database_config');
const routes = require('./routes/routes');
const bodyParser = require('body-parser');
/**
 * @description setting port for server
 */
// const port = process.env.PORT || 3001;
// app.listen(port, () => console.log(`Listening on port ${port}`));
/**
 * @description Parsing the request get by client
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true}));
app.use('/', routes);
server = app.listen(3001,()=>{
  console.log('server is up and running');
});
/**
 * @description Database Connection
 */
let db_url = db_connect.url;
startMongo(db_url);
/**
 * @description cheking database connectivity
 * @param {String} db_url 
 */
function startMongo(db_url)
{
  mongoose.connect(db_url, {useCreateIndex: true, useNewUrlParser: true});
  mongoose.connection.on('error', (error) => { console.log('Connection error with MongoDb');  });
  mongoose.connection.on('open', () => { console.log('Successfully Connected to MongoDb');  });
}
/**
 * making socket connecion ready & ready to listen on port
 */
const socket_io = require('socket.io')(server);
/**
 * @description when client connected to socket, this below code runs
 */
socket_io.on('connection', function(socket) {
  console.log('Client Connected on Server Side');
});

socket_io.on('chat_message', function(message_sent, user_login) {
  console.log('server page chat app receiving');
  console.log(user_login+" logged in  : message sent is : " +messageContent)
  /**
   * @description 'socket.on' will be used only when we have to show how many are login to all users except the person login and seeing
   * socket.on('join', function(email_id) {}
   * ---------------------------------------------------
   * 'socket_io' will be used only when we have to show all users including the one currently login & seeing
   * socket_io('join', function(email_id)) {}
   */
  //create a message object
  // let  message = {"message":messageContent, "sender":sender}  
  // send the message to the client side  
  // socket_io.emit('response_message', message)
})

/**
 * cheking socket connection on port is listening or not
 */
socket_io.on('disconnect', function () {
  console.log('Client Disconnected on Server Side');
  //socket.broadcast.emit( "userdisconnect" ,' user has left')  
})

/**
 * Displaying get request on server side webpage
 */
app.get('/', function(req,res) {
  res.json({message: 'welcome to ChatApp'});
});
//we donot use http because we are using our own server
// http.listen(3001, function() {
//   console.log('socket listening on 3001');
// })

// app.use( session ({
//   secret : 'fraggle-rock', //random string
//   resave : false,
//   saveUninitialized : false
// }))

// create a GET route
// app.get('/express_backend', (req, res) => {
  // res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
// });